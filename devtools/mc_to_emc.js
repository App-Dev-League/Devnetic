const file = "ai/0.json"
const fs = require("fs")
const path = require("path")

var actions = []
var modules = fs.readdirSync("../src/data/modules/")
modules.forEach(folder => {
    if (folder.endsWith("-assets")) return;
    else actions.push(folder)
})


actions.forEach(folder => {
    let files = fs.readdirSync("../src/data/modules/"+folder);
    files.forEach(file => {
        processPage(folder+"/"+file)
        console.log("processed page: "+ folder+"/"+file)
    })
})

function processPage(file, time = 0) {
    if (time === 6) return true;
    time ++
    let content = fs.readFileSync(path.join("../src/data/modules/", file), "utf8")
    content = JSON.parse(content)
    var pages = content.pages;

    for (let i in pages) {
        let page = pages[i]
        if (page.type === "multiple_choice" && i !== 0 && pages[i - 1] && pages[i - 1].type === "information" && !page.code) {
            var elements = []
            elements.push({
                type: "text",
                content: `[[h6]]${page.question}[[/]]`
            })
            pages[i - 1].elements.push({
                type: "embedded_multiple_choice",
                elements: elements,
                answers: page.answers,
                correct: page.correct,
                descriptions: page.descriptions,
                points: page.points,
                coins: page.coins
            })
            pages[i] = null;
        }
    }

    for (let i in pages) {
        if (pages[i] === null) {
            pages.splice(i, 1)
        }
    }

    content.pages = pages;
    fs.writeFileSync(path.join("../src/data/modules/", file), JSON.stringify(content, null, 4))
    processPage(file, time)
    return true;
}