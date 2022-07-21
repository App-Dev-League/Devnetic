const codeBlock=require("../components/codeBlock.js"),codeBlockHelper=require("./codeBlocks.js"),codeTemplateToCode=require("./codeTemplateToCode.js"),MultipleChoice=require("../components/EmbededMultipleChoice.js");function convertStyles(e){let t=e,i=(t.width||(t.width="90%"),"");return Object.entries(t).forEach(([e,t])=>{"src"!==e&&"type"!==e&&(i+=e+`: ${t};`)}),i}module.exports=function t(e){var i,o;return"code"==e.type?`<div class="codeblock-wrapper">
        ${new codeBlock({code:codeBlockHelper.escapeHtml(e.content||""),language:e.lang,name:e.name})}
</div>`:"divider"==e.type?e.height?`<div style="width: 100%; height: ${e.height}px; background-color: rgba(0,0,0,0)"></div>`:'<div style="width: 100%; height: 20px; background-color: rgba(0,0,0,0)"></div>':"image"==e.type?(i=convertStyles(e),`<div class="image-wrapper info-text"><img src="${e.src}" style="display: block; margin-left: auto; margin-right: auto; ${i}"></div>`):"iframe"==e.type?(i=convertStyles(e),`<div class="image-wrapper info-text"><iframe src="${e.src}" style="border-radius: 10px; display: block; margin-left: auto; margin-right: auto; ${i}" onload="resizeIframe(this)"></iframe></div>`):"split-content"==e.type?`
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
        `:"embedded_multiple_choice"==e.type?(i="Multiple Choice Question",e.question&&!e.elements&&(e.elements=[{type:"text",content:`[[h6]]${e.question}[[/]]`}]),e.elements[0].content&&e.elements[0].content.toLowerCase().replaceAll(" ","").includes("trueorfalse")&&(i="True or False"),o=new MultipleChoice({answers:e.answers,correct:e.correct,descriptions:e.descriptions,points:e.points,coins:e.coins},null),`
        <div class="multiple-choice-wrapper" onclick="document.querySelector('.stack-width').classList.add('blur-all-non-mc-questions')">
        <div class="indicator-symbol">${i}</div>
        <canvas class="mc-answer-confetti"></canvas>

            ${e.elements.map(e=>(e.width=e.width||"100%",`
                    <div class="info-vertical-content-element">
                        ${t(e)}
                    </div>
                `)).join("")}
        ${o}
        </div>
        `):"note"===e.type?`
        <div class="info-text info-note">
            ${codeTemplateToCode(e.content||"")}
        </div>`:`<pre class="info-text">${codeTemplateToCode(e.content||"")}</pre>`};