const codeBlock=require("../components/codeBlock.js"),codeBlockHelper=require("./codeBlocks.js"),MultipleChoice=require("../components/EmbededMultipleChoice.js");var converter=new showdown.Converter({extentions:[]});module.exports=function(e){let a=0;return e=(e=(e=(e=e.replace(/```[\S\s]*?```/g,function(e){let i=e.slice(3,e.indexOf("\n"));e=e.slice(e.indexOf("\n"),-3);return`<div class="codeblock-wrapper">
            ${new codeBlock({code:codeBlockHelper.escapeHtml(e),language:i.split("-")[0],name:i.split("-")[1]||""})}
        </div>`})).replace(/!!\(.*\)/g,function(e){return`<div class="image-wrapper info-text"><iframe src="${e.slice(3,-1)}" style="width: 100%; height: 400px; border-radius: 10px; display: block; margin-left: auto; margin-right: auto;" onload="resizeIframe(this)"></iframe></div>`})).replace(/<Q>.+?<\/Q>/gms,function(e){let i=e.slice(3,-4).split("\n").filter(e=>!!e),s="",t=[],c=[],l=0,r=0,n=0;i.forEach(e=>{let i=e.trim();i.startsWith("?")?s=i.slice(1):i.startsWith("!")?(i.endsWith("*")&&(l=t.length,i=i.slice(0,-1)),t.push(i.slice(1))):i.startsWith("+")?c.push(i.slice(1)):i.startsWith("p:")?r=Number(i.slice(2)):i.startsWith("c:")&&(n=Number(i.slice(2)))});var e="Multiple Choice Question",o=(t.find(e=>"true"===e.toLowerCase())&&t.find(e=>"false"===e.toLowerCase())&&(e="True or False"),new MultipleChoice({answers:t,correct:l,descriptions:c,points:r,coins:n,elementNum:a},null));return a++,`<div class="multiple-choice-wrapper" onclick="document.querySelector('.stack-width').classList.add('blur-all-non-mc-questions')">
            <div class="indicator-symbol">${e}</div>
            <canvas class="mc-answer-confetti"></canvas>
            <h3>${s}</h3>
            ${o}
        </div>`})).replace(/N!.*?N!/gs,function(e){let i=e.slice(2,-2),s="Note:";return i.startsWith("-")&&(s=i.slice(1,i.indexOf("\n")),i=i.slice(i.indexOf("\n"))),`<div class="info-note">
            <div>
                <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"></path></svg>
                <span>${s}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(i)}</pre>
        </div>
        `}),converter.makeHtml(e)};