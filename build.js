const fs = require("fs");
const path = require("path");
var UglifyJS = require("uglify-js");
var jsonminify = require("jsonminify");
var minify = require('html-minifier').minify;


console.log("Clearing old files...");
try {
    fs.rmSync('./docs', { recursive: true });
} catch (err) { }

console.log("Updating module index...")
createModuleIndex();
console.log("Building...")
copyFolderSync("./src", "./docs")
console.log("Cleaning up...");
cleanUp();
console.log("Build complete!");

function copyFolderSync(from, to) {
    fs.mkdirSync(to);
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            if (element.endsWith(".js") && !element.endsWith(".min.js")) {
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
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}
function createModuleIndex() {
    var json = {};
    var actions = {
        "Webdev Lessons": "webdev",
        "Webdev Projects": "webdev-projects",
        "AI Lessons": "ai",
        //"Intro To CS": "intro-to-cs",
    }
    json.actions = actions;
    Object.entries(actions).forEach(([key, value]) => {
        json[value] = {
            totalPages: 0,
            module_meta_data: []
        };
        fs.readdirSync(`./src/data/modules/${value}`).forEach(element => {
            if (element.endsWith("-example.json")) return;
            console.log(element, value)
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
function cleanUp() {
    let menu = fs.readFileSync("./docs/views/menu.html", "utf8");
    menu = menu.replace(`var actions="<%-JSON.stringify(actions)%>"`, `var actions='<%-JSON.stringify(actions)%>'`)
    fs.writeFileSync("./docs/views/menu.html", menu);

    let indexHTML = fs.readFileSync("./docs/index.html", "utf8");
    indexHTML = indexHTML.replace(`window.environment="development"`, `window.environment="production"`);
    fs.writeFileSync("./docs/index.html", indexHTML);
}