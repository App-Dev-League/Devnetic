const fs = require("fs");
const path = require("path");
var UglifyJS = require("uglify-js");
var jsonminify = require("jsonminify");
var minify = require('html-minifier').minify;
const { readdir, stat } = require('fs/promises');

const dirSize = async directory => {
    const files = await readdir(directory);
    const stats = files.map(file => stat(path.join(directory, file)));

    return (await Promise.all(stats)).reduce((accumulator, { size }) => accumulator + size, 0);
}

var actions = {
    "Webdev Lessons": "webdev",
    "Webdev Projects": "webdev-projects",
    "AI Lessons": "ai",
    "Intro To CS": "intro-to-cs",
}
var colors = {
    "webdev": "linear-gradient(to right, #c33764, #1d2671)",
    "webdev-projects": "linear-gradient(to right, #4776e6, #8e54e9)",
    "ai": "linear-gradient(to right, #348f50, #56b4d3)",
    "intro-to-cs": "linear-gradient(to right, #4ecdc4, #556270)"
}


const BUILD_DIR = "build";

console.log("Clearing old files...");
try {
    fs.rmSync(`./${BUILD_DIR}/public/app`, { recursive: true });
} catch (err) { }

var fileList = []


main()
async function main() {
    console.log("Updating indices...")
    await createModuleIndex();
    await createPluginSizeIndex();
    console.log("Combining sequential text elements...")
    await combineSequentialTextElements();
    console.log("Updating version...")
    await updateVersion();
    console.log("Building...")
    await copyFolderSync("./src", `./${BUILD_DIR}/public/app`)
    console.log("Creating offline file map...");
    await createOfflineFileMap();
    console.log("Cleaning up...");
    await cleanUp();
    console.log("Build complete!");

}


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
                try {
                    htmlFile = minify(htmlFile, {
                        minifyCSS: true,
                        minifyJS: true,
                    });
                } catch (err) {
                    console.log("Failed to optimize " + element);
                    htmlFile = fs.readFileSync(path.join(from, element), "utf8");
                }
                fs.writeFileSync(path.join(to, element), htmlFile);
            } else {
                console.log("Copying " + element);
                fs.copyFileSync(path.join(from, element), path.join(to, element));
            }
            if ((to.includes("plugins") && !element.endsWith(".svg") && !element.endsWith(".png")) || element === "VERSION" || element === ".gitkeep" || element === "CNAME") { }
            else {
                fileList.push(path.join(to, element).replace(/\\/g, "/").replace(`${BUILD_DIR}/public`, ""))
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
            module_meta_data: [],
            background: colors[value]
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
async function createPluginSizeIndex() {
    var json = {};
    let allFiles = fs.readdirSync("./src/assets/plugins");
    for (let i in allFiles) {
        let element = allFiles[i];
        if (element === "sizes.json") continue;
        json[element] = await dirSize(path.join("./src/assets/plugins", element))
    }
    fs.writeFileSync("./src/assets/plugins/sizes.json", JSON.stringify(json, null, 4));

    for (let i in allFiles) {
        let element = allFiles[i]
        if (element === "sizes.json") continue;
        fs.writeFileSync(`./src/assets/plugins/${element}/files.map`, "temp")
        let files = fs.readdirSync(`./src/assets/plugins/${element}`)
        fs.writeFileSync(`./src/assets/plugins/${element}/files.map`, JSON.stringify(files))
    }
}
function cleanUp() {
    let menu = fs.readFileSync(`./${BUILD_DIR}/public/app/views/menu.html`, "utf8");
    menu = menu.replace(`var actions="<%-JSON.stringify(actions)%>"`, `var actions='<%-JSON.stringify(actions)%>'`)
    fs.writeFileSync(`./${BUILD_DIR}/public/app/views/menu.html`, menu);

    let indexHTML = fs.readFileSync(`./${BUILD_DIR}/public/app/index.html`, "utf8");
    indexHTML = indexHTML.replace(`window.environment="development"`, `window.environment="production"`);
    fs.writeFileSync(`./${BUILD_DIR}/public/app/index.html`, indexHTML);
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
                        newPage.elements[i - 1].content += "\n" + element.content;
                        newPage.elements.splice(i, 1);
                        return recurseThrough(i);
                    } else {
                        previousElementType = element.type;

                        if (element.type === "iframe" || element.type === "image") {
                            if (element.src && element.src.startsWith("/")) {
                                element.src = "." + element.src;
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
    fs.writeFileSync("./src/VERSION", (version + 1).toString());
}
function createOfflineFileMap() {
    let configFile = fs.readFileSync(`./${BUILD_DIR}/public/app/config.js`, "utf8");
    configFile = configFile.replace(`["will_be_replaced_in_build"]`, JSON.stringify(fileList));
    fs.writeFileSync(`./${BUILD_DIR}/public/app/config.js`, configFile);
    fs.writeFileSync(`./${BUILD_DIR}/public/app/UPDATE_FILE_MAP.json`, JSON.stringify(fileList))
    fs.writeFileSync("./src/UPDATE_FILE_MAP.json", JSON.stringify(fileList))
}