const codeBlock = require("../components/codeBlock.js");
const codeBlockHelper = require("./codeBlocks.js");

const codeTemplateToCode = require("./codeTemplateToCode.js");

module.exports = function(element) {
    if(element.type == "code") {
        return `<div class="codeblock-wrapper">
        ${new codeBlock({code: codeBlockHelper.escapeHtml(element.content || ""), language: element.lang, name: element.name})}
</div>`
    } else if (element.type == "divider"){
        if (element.height) return `<div style="width: 100%; height: ${element.height}px; background-color: rgba(0,0,0,0)"></div>`;
        else return `<div style="width: 100%; height: 20px; background-color: rgba(0,0,0,0)"></div>`;
    } else if (element.type == "image"){
        let styles = element;
        if (!styles.width) styles.width = "90%"
        let style = "";
        Object.entries(styles).forEach(([key, value]) => {
            if (key !== "src" && key !== "type") style += `${key}: ${value};`
        })
        return `<div class="image-wrapper info-text"><img src="${element.src}" style="display: block; margin-left: auto; margin-right: auto; ${style}"></div>`
    } else if (element.type == "iframe") {
        let styles = element;
        if (!styles.width) styles.width = "90%"
        let style = "";
        Object.entries(styles).forEach(([key, value]) => {
            if (key !== "src" && key !== "type") style += `${key}: ${value};`
        })
        return `<div class="image-wrapper info-text"><iframe src="${element.src}" style="display: block; margin-left: auto; margin-right: auto; ${style}" onload="resizeIframe(this)"></iframe></div>`
    } else {
        return `<pre class="info-text">${codeTemplateToCode(element.content || "")}</pre>`;
    }
}