const codeBlock = require("../components/codeBlock.js");
const codeBlockHelper = require("./codeBlocks.js");


var converter = new showdown.Converter({ extentions: [] });



module.exports = function renderMdd(mddString) {
    mddString = mddString.replace(/```[\S\s]*?```/g, function(e) {
        let language = e.slice(3, e.indexOf("\n"))
        let content = e.slice(e.indexOf("\n"), -3)
        return `<div class="codeblock-wrapper">
            ${new codeBlock({ code: codeBlockHelper.escapeHtml(content), language: language.split("-")[0], name: language.split("-")[1] || "" })}
        </div>`
    })

    let html = converter.makeHtml(mddString)
    return html
}

