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
var moduleData = {
    "webdev": {
        color: "linear-gradient(to right, #c33764, #1d2671)",
        desc: "By the end of the course, you will be very familiar with languages HTML, CSS, JavaScript, Node.js, and have a strong understanding of technologies like Express, JSX, and React.",
        weeks: ["HTML", "CSS", "Javascript", "HTML, CSS, & JS", "Node.JS", "Express.JS", "JSX & React", "Advanced React"]
    },
    "webdev-projects": {
        color: "linear-gradient(to right, #4776e6, #8e54e9)",
        desc: "Put your HTML, CSS, JS, React, and Express.JS skills to use! Create useful web apps, publish your first package for others to use, and much, much more!",
        weeks: ["Personal Website", "Store Interface", "Console Games", "Calculator", "NPM Module", "Express.JS", "Information Displayer", "To-do List"]
    },
    "ai": {
        color: "linear-gradient(to right, #348f50, #56b4d3)",
        desc: "Students will be skilled in topics such as tree AI, regression, SVM, neural networks, computer vision, NLP, and unsupervised learning. Python is primarily used.",
        weeks: ["Python", "Intro to AI", "Regression & SVM", "Tree ML", "Neural Networks", "Computer Vision", "NLP", "Unsupervised Learning"]
    },
    "intro-to-cs": {
        color: "linear-gradient(to right, #4ecdc4, #556270)",
        desc: "Students will be able to demonstrate loops, functions, classes, and more in their Python code. They will be able to solve USACO-style problems with these tools.",
        weeks: ["Introduction to CS and Python", "Loops/Functions/Libraries", "Object Orientated Programing", "Data Structures & Algorithms Pt. 1", "Data Structures and Algorithms Pt. 2", "USACO Bronze Concepts", "USACO Silver Concepts", "USACO Gold Concepts"]
    }
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
            background: moduleData[value].color,
            desc: moduleData[value].desc,
            weeks: moduleData[value].weeks,
        };
        fs.readdirSync(`./src/data/modules/${value}`).forEach(element => {
            if (element.endsWith("-example.json")) return;
            let fileData = JSON.parse(fs.readFileSync(`./src/data/modules/${value}/${element}`, "utf8"));
            json[value].totalPages += fileData.pages.length;
            json[value].module_meta_data.push({
                name: fileData.pages[0].title,
                moduleLength: fileData.pages.length,
                pageBreakdown: fileData.pages.map(page => {
                    try {
                        return {
                            title: page.title || page.question || page.name || page.elements[0].content.replace(/\[\[.{1,5}\]\]/g, ""),
                            type: page.type
                        }
                    } catch {
                        return {
                            title: "no_data",
                            type: page.type
                        }
                    }
                })
            })
        })
        fs.writeFileSync(`./src/views/${value}.html`, `
        <div class="track-header-bg"></div><div class="track-header-card stack-width"><a class="backhome" href="#/"><span class="codicon codicon-arrow-left"></span>Back Home</a>
	<span class="name">${key}</span>
	<span class="desc">${moduleData[value].desc}</span>
	<span class="time"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/></svg><span>0-0hr</span></span>
</div>


<div class="stack-width lesson-chooser">
	<h2>Lessons</h2>
	${moduleData[value].weeks.map((data, index) => {
            return `
        <a class="module-button" href="#/learn/${value}/${index}/">
		<span class="title"><span class="week">Week ${index + 1}</span>${data}</span>
		<span class="status-indic"></span>
	</a>
    `
        }).join("")}
</div>
<div id="menu-container" class="codicon codicon-loading" style="position: absolute; top: 10px; right: 10px;"><% include('./views/menu.html').then(res => {document.getElementById("menu-container").classList.remove("codicon-loading"); document.getElementById("menu-container").innerHTML = res;nodeScriptReplace(document.getElementById("menu-container"))}) %></div>
<a href="#/my-projects" class="my-projects codicon codicon-folder" title="Your projects" style="position: absolute; top: 10px; right: 50px;"></a>
<a onclick="downloadSaveFile()" title="Download save file" class="my-projects codicon codicon-desktop-download" style="position: absolute; top: 10px; right: 83px;"></a>
<a onclick="loadSaveFile()" title="Load a save file" class="my-projects codicon codicon-cloud-upload" style="position: absolute; top: 10px; right: 115px;"></a>
        `)
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