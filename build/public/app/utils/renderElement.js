const codeBlock=require("../components/codeBlock.js"),codeBlockHelper=require("./codeBlocks.js"),codeTemplateToCode=require("./codeTemplateToCode.js"),MultipleChoice=require("../components/EmbededMultipleChoice.js");function convertStyles(e){let t=e,i=(t.width||(t.width="100%"),"");return Object.entries(t).forEach(([e,t])=>{"src"!==e&&"type"!==e&&(i+=e+`: ${t};`)}),i}module.exports=function t(e,i){var o;return"code"==e.type?`<div class="codeblock-wrapper">
        ${new codeBlock({code:codeBlockHelper.escapeHtml(e.content||""),language:e.lang,name:e.name})}
</div>`:"divider"==e.type?e.height?`<div style="width: 100%; height: ${e.height}px; background-color: rgba(0,0,0,0)"></div>`:'<div style="width: 100%; height: 20px; background-color: rgba(0,0,0,0)"></div>':"image"==e.type?(o=convertStyles(e),`<div class="image-wrapper info-text"><img src="${e.src}" style="display: block; margin-left: auto; margin-right: auto; ${o}"></div>`):"iframe"==e.type?(o=convertStyles(e),`<div class="image-wrapper info-text"><iframe src="${e.src}" style="border-radius: 10px; display: block; margin-left: auto; margin-right: auto; ${o}" onload="resizeIframe(this)"></iframe></div>`):"split-content"==e.type?`
        <div class="info-split-content">
            ${e.elements.map(e=>(e.width=e.width||"100%",`
                    <div class="info-split-content-element">
                        ${t(e)}
                    </div>
                `)).join("")}
        </div>
        `:"vertical-content"==e.type?`
        <div class="info-vertical-content">
            ${e.elements.map(e=>(e.width=e.width||"100%",`
                    <div class="info-vertical-content-element">
                        ${t(e)}
                    </div>
                `)).join("")}
        </div>
        `:"embedded_multiple_choice"==e.type?(o="Multiple Choice Question",e.question&&!e.elements&&(e.elements=[{type:"text",content:`[[h6]]${e.question}[[/]]`}]),e.elements[0].content&&e.elements[0].content.toLowerCase().replaceAll(" ","").includes("trueorfalse")&&(o="True or False"),i=new MultipleChoice({answers:e.answers,correct:e.correct,descriptions:e.descriptions,points:e.points,coins:e.coins,elementNum:i},null),`
        <div class="multiple-choice-wrapper" onclick="document.querySelector('.stack-width').classList.add('blur-all-non-mc-questions')">
        <div class="indicator-symbol">${o}</div>
        <canvas class="mc-answer-confetti"></canvas>

            ${e.elements.map(e=>(e.width=e.width||"100%",`
                    <div class="info-vertical-content-element">
                        ${t(e)}
                    </div>
                `)).join("")}
        ${i}
        </div>
        `):"note"===e.type?`
        <div class="info-text info-note">
            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"></path></svg>
            ${codeTemplateToCode(e.content||"")}
        </div>`:`<pre class="info-text">${codeTemplateToCode(e.content||"")}</pre>`};