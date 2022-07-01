const fs = require("fs");
const path = require("path");
var UglifyJS = require("uglify-js");
var jsonminify = require("jsonminify");
var minify = require('html-minifier').minify;


var actions = {
    "Webdev Lessons": "webdev",
    "Webdev Projects": "webdev-projects",
    "AI Lessons": "ai",
    "Intro To CS": "intro-to-cs",
}



console.log("Clearing old files...");
try {
    fs.rmSync('./landing-page/public/app', { recursive: true });
} catch (err) { }

var fileList = []

console.log("Updating indices...")
createModuleIndex();
createPluginSizeIndex();
console.log("Combining sequential text elements...")
combineSequentialTextElements();
console.log("Updating version...")
updateVersion();
console.log("Building...")
copyFolderSync("./src", "./landing-page/public/app")
console.log("Creating offline file map...");
createOfflineFileMap();
console.log("Cleaning up...");
cleanUp();
console.log("Build complete!");

function copyFolderSync(from, to) {
    fs.mkdirSync(to);
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            if (element.endsWith(".js") && !element.endsWith(".min.js") && !from.includes("monaco-editor")) {
                console.log("Optimizing " + element);
                let jsFile = fs.readFileSync(path.join(from, element), "utf8");
                jsFile = UglifyJS.minify(jsFile, {
                    compress: {
                        passes: 4
                    }
                });
                fs.writeFileSync(path.join(to, element), jsFile.code);
            } else if (element.endsWith(".json")) {
                console.log("Optimizing " + element);
                let jsonFile = fs.readFileSync(path.join(from, element), "utf8");
                jsonFile = jsonminify(jsonFile);
                fs.writeFileSync(path.join(to, element), jsonFile);
            } else if (element.endsWith(".html")) {
                console.log("Optimizing " + element);
                let htmlFile = fs.readFileSync(path.join(from, element), "utf8");
                htmlFile = minify(htmlFile, {
                    minifyCSS: true,
                    minifyJS: true,
                });
                fs.writeFileSync(path.join(to, element), htmlFile);
            } else {
                console.log("Copying " + element);
                fs.copyFileSync(path.join(from, element), path.join(to, element));
            }
            if ((to.includes("plugins") && element.endsWith("min.js")) || element === "VERSION" || element === ".gitkeep" || element === "CNAME") {}
            else {
                fileList.push(path.join(to, element).replace(/\\/g, "/").replace("landing-page/public", ""))
            }
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}
function createModuleIndex() {
    var json = {};
    json.actions = actions;
    Object.entries(actions).forEach(([key, value]) => {
        json[value] = {
            totalPages: 0,
            module_meta_data: []
        };
        fs.readdirSync(`./src/data/modules/${value}`).forEach(element => {
            if (element.endsWith("-example.json")) return;
            let fileData = JSON.parse(fs.readFileSync(`./src/data/modules/${value}/${element}`, "utf8"));
            json[value].totalPages += fileData.pages.length;
            json[value].module_meta_data.push({
                name: fileData.pages[0].title,
                moduleLength: fileData.pages.length
            })
        })
    })
    fs.writeFileSync("./src/data/module_index.json", JSON.stringify(json, null, 4));
}
function createPluginSizeIndex() {
    var json = {};
    fs.readdirSync("./src/assets/plugins").forEach(element => {
        if (element === "sizes.json") return;
        json[element] = fs.statSync(path.join("./src/assets/plugins", element, element+".min.js")).size;
    })
    fs.writeFileSync("./src/assets/plugins/sizes.json", JSON.stringify(json, null, 4));
}
function cleanUp() {
    let menu = fs.readFileSync("./landing-page/public/app/views/menu.html", "utf8");
    menu = menu.replace(`var actions="<%-JSON.stringify(actions)%>"`, `var actions='<%-JSON.stringify(actions)%>'`)
    fs.writeFileSync("./landing-page/public/app/views/menu.html", menu);

    let indexHTML = fs.readFileSync("./landing-page/public/app/index.html", "utf8");
    indexHTML = indexHTML.replace(`window.environment="development"`, `window.environment="production"`);
    fs.writeFileSync("./landing-page/public/app/index.html", indexHTML);
}
function combineSequentialTextElements() {
    Object.entries(actions).forEach(([key, value]) => {
        fs.readdirSync(`./src/data/modules/${value}`).forEach(element => {
            let file = JSON.parse(fs.readFileSync(`./src/data/modules/${value}/${element}`, "utf8"));
            file.pages.forEach(page => {
                var previousElementType = null;
                var newPage = page;
                recurseThrough(0)
                function recurseThrough(i) {
                    if (!newPage.elements) return;
                    let element = newPage.elements[i];
                    if (!element) return;
                    if (previousElementType === "text" && element.type === "text") {
                        newPage.elements[i - 1].content += "\n"+element.content;
                        newPage.elements.splice(i, 1);
                        return recurseThrough(i);
                    } else {
                        previousElementType = element.type;

                        if (element.type === "iframe" || element.type === "image") {
                            if (element.src && element.src.startsWith("/")) {
                                element.src = "."+element.src;
                            }
                        }

                        return recurseThrough(i + 1);
                    }
                }
            })
            fs.writeFileSync(`./src/data/modules/${value}/${element}`, JSON.stringify(file, null, 4));
        })
    })
}
function updateVersion() {
    let version = Number(fs.readFileSync("./src/VERSION", "utf8"));
    fs.writeFileSync("./src/VERSION", (version+1).toString());
}
function createOfflineFileMap(){
    let configFile = fs.readFileSync("./landing-page/public/app/config.js", "utf8");
    configFile = configFile.replace(`["will_be_replaced_in_build"]`, JSON.stringify(fileList));
    fs.writeFileSync("./landing-page/public/app/config.js", configFile);
    fs.writeFileSync("./landing-page/public/app/UPDATE_FILE_MAP.json", JSON.stringify(fileList))
    fs.writeFileSync("./src/UPDATE_FILE_MAP.json", JSON.stringify(fileList))
}