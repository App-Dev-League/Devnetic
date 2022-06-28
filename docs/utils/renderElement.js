const codeBlock=require("../components/codeBlock.js"),codeBlockHelper=require("./codeBlocks.js"),codeTemplateToCode=require("./codeTemplateToCode.js");function convertStyles(e){let t=e,o=(t.width||(t.width="90%"),"");return Object.entries(t).forEach(([e,t])=>{"src"!==e&&"type"!==e&&(o+=e+`: ${t};`)}),o}module.exports=function t(e){var o;return"code"==e.type?`<div class="codeblock-wrapper">
        ${new codeBlock({code:codeBlockHelper.escapeHtml(e.content||""),language:e.lang,name:e.name})}
</div>`:"divider"==e.type?e.height?`<div style="width: 100%; height: ${e.height}px; background-color: rgba(0,0,0,0)"></div>`:'<div style="width: 100%; height: 20px; background-color: rgba(0,0,0,0)"></div>':"image"==e.type?(o=convertStyles(e),`<div class="image-wrapper info-text"><img src="${e.src}" style="display: block; margin-left: auto; margin-right: auto; ${o}"></div>`):"iframe"==e.type?(o=convertStyles(e),`<div class="image-wrapper info-text"><iframe src="${e.src}" style="border-radius: 10px; display: block; margin-left: auto; margin-right: auto; ${o}" onload="resizeIframe(this)"></iframe></div>`):"split-content"==e.type?`
        <div class="info-split-content">
            ${e.elements.map(e=>(e.width="100%",`
                    <div class="info-split-content-element">
                        ${t(e)}
                    </div>
                `)).join("")}
        </div>
        `:`<pre class="info-text">${codeTemplateToCode(e.content||"")}</pre>`};