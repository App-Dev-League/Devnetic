const codeBlock=require("../components/codeBlock.js"),codeBlockHelper=require("./codeBlocks.js"),codeTemplateToCode=require("./codeTemplateToCode.js");function convertStyles(e){let t=e,i=(t.width||(t.width="90%"),"");return Object.entries(t).forEach(([e,t])=>{"src"!==e&&"type"!==e&&(i+=e+`: ${t};`)}),i}module.exports=function t(e){var i;return"code"==e.type?`<div class="codeblock-wrapper">
        ${new codeBlock({code:codeBlockHelper.escapeHtml(e.content||""),language:e.lang,name:e.name})}
</div>`:"divider"==e.type?e.height?`<div style="width: 100%; height: ${e.height}px; background-color: rgba(0,0,0,0)"></div>`:'<div style="width: 100%; height: 20px; background-color: rgba(0,0,0,0)"></div>':"image"==e.type?(i=convertStyles(e),`<div class="image-wrapper info-text"><img src="${e.src}" style="display: block; margin-left: auto; margin-right: auto; ${i}"></div>`):"iframe"==e.type?(i=convertStyles(e),`<div class="image-wrapper info-text"><iframe src="${e.src}" style="border-radius: 10px; display: block; margin-left: auto; margin-right: auto; ${i}" onload="resizeIframe(this)"></iframe></div>`):"split-content"==e.type?`
        <div class="info-split-content">
            ${e.elements.map(e=>(e.width="100%",`
                    <div class="info-split-content-element">
                        ${t(e)}
                    </div>
                `)).join("")}
        </div>
        `:"vertical-content"==e.type?`
        <div class="info-vertical-content">
            ${e.elements.map(e=>(e.width="100%",`
                    <div class="info-vertical-content-element">
                        ${t(e)}
                    </div>
                `)).join("")}
        </div>
        `:`<pre class="info-text">${codeTemplateToCode(e.content||"")}</pre>`};