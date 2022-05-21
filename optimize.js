const fs = require("fs");
const path = require("path");
var UglifyJS = require("uglify-js");
var jsonminify = require("jsonminify");


console.log("Clearing old files...");
fs.rmSync('./dist', { recursive: true });


console.log("Optimizing...")
copyFolderSync("./", "./dist")
console.log("Done!")


function copyFolderSync(from, to) {
    fs.mkdirSync(to);
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            if (element.endsWith(".js") && !element.endsWith(".min.js")) {
                console.log("Optimizing " + element);
                let jsFile = fs.readFileSync(path.join(from, element), "utf8");
                jsFile = UglifyJS.minify(jsFile);
                fs.writeFileSync(path.join(to, element), jsFile.code);
            } else if (element.endsWith(".json")) {
                console.log("Optimizing " + element);
                let jsonFile = fs.readFileSync(path.join(from, element), "utf8");
                jsonFile = jsonminify(jsonFile);
                fs.writeFileSync(path.join(to, element), jsonFile);
            } else {
                console.log("Copying " + element);
                fs.copyFileSync(path.join(from, element), path.join(to, element));
            }
        } else {
            if (element === "dist") return;
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}