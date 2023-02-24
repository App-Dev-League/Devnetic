const codeBlock=require("../components/codeBlock.js"),codeBlockHelper=require("./codeBlocks.js"),MultipleChoice=require("../components/EmbededMultipleChoice.js");var converter=new showdown.Converter({extentions:[]});module.exports=function(e){let o=0;return e=(e=(e=(e=(e=(e=(e=(e=e.replace(/```[\S\s]*?```/g,function(e){let i=e.slice(3,e.indexOf("\n"));e=e.slice(e.indexOf("\n"),-3);return`<div class="codeblock-wrapper">
            ${new codeBlock({code:codeBlockHelper.escapeHtml(e),language:i.split("-")[0],name:i.split("-")[1]||""})}
        </div>`})).replace(/!!\(.*\)/g,function(e){return`<div class="image-wrapper info-text"><iframe src="${e.slice(3,-1)}" style="width: 100%; height: 400px; border-radius: 10px; display: block; margin-left: auto; margin-right: auto;" onload="resizeIframe(this)"></iframe></div>`})).replace(/<Q>.+?<\/Q>/gms,function(e){let i=e.slice(3,-4).split("\n").filter(e=>!!e),s="",t=[],a=[],n=0,r=0,l=0;i.forEach(e=>{let i=e.trim();i.startsWith("?")?s=i.slice(1):i.startsWith("!")?(i.endsWith("*")&&(n=t.length,i=i.slice(0,-1)),t.push(i.slice(1))):i.startsWith("+")?a.push(i.slice(1)):i.startsWith("p:")?r=Number(i.slice(2)):i.startsWith("c:")&&(l=Number(i.slice(2)))});var e="Multiple Choice Question",c=(t.find(e=>"true"===e.toLowerCase())&&t.find(e=>"false"===e.toLowerCase())&&(e="True or False"),new MultipleChoice({answers:t,correct:n,descriptions:a,points:r,coins:l,elementNum:o},null));return o++,`<div class="multiple-choice-wrapper" onclick="document.querySelector('.stack-width').classList.add('blur-all-non-mc-questions')">
            <div class="indicator-symbol">${e}</div>
            <canvas class="mc-answer-confetti"></canvas>
            <h3>${s}</h3>
            ${c}
        </div>`})).replace(/N!.*?N!/gs,function(e){let i=e.slice(2,-2),s="Note:";return i.startsWith("-")&&(s=i.slice(1,i.indexOf("\n")),i=i.slice(i.indexOf("\n"))),`<div class="info-annotation info-note">
            <div>
                <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"></path></svg>
                <span>${s}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(i)}</pre>
        </div>
        `})).replace(/W!.*?W!/gs,function(e){let i=e.slice(2,-2),s="Warning!";return i.startsWith("-")&&(s=i.slice(1,i.indexOf("\n")),i=i.slice(i.indexOf("\n"))),`<div class="info-annotation info-warning">
            <div>
            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"></path></svg>                <span>${s}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(i)}</pre>
        </div>
        `})).replace(/E!.*?E!/gs,function(e){let i=e.slice(2,-2),s="Error!";return i.startsWith("-")&&(s=i.slice(1,i.indexOf("\n")),i=i.slice(i.indexOf("\n"))),`<div class="info-annotation info-error">
            <div>
            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"></path></svg>             <span>${s}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(i)}</pre>
        </div>
        `})).replace(/T!.*?T!/gs,function(e){let i=e.slice(2,-2),s="Tip:";return i.startsWith("-")&&(s=i.slice(1,i.indexOf("\n")),i=i.slice(i.indexOf("\n"))),`<div class="info-annotation info-tip">
            <div>
            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"></path></svg>             <span>${s}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(i)}</pre>
        </div>
        `})).replace(/<R>.+?<\/R>/gms,function(e){let i=e.slice(3,-4).split("\n").filter(e=>!!e),s=[];return i.forEach(e=>{let i=e.trim();i&&(i=i.split("|").filter(e=>!!e),s.push({sourcename:i[0],title:i[1],description:i[2],url:i[3]}))}),console.log(s),`<div class="resource-list-wrapper">
            <span class="resource-list-title">Resources</span>
            <table>
                ${s.map(e=>`<tr>
                    <td class="sourcename">${e.sourcename}</td>
                    <td class="sourcetitle"><a target="_blank" href="${e.url}">${e.title}</a></td>
                    <td class="sourcedescription">${e.description}</td>
                    <td><div class="codicon codicon-copy" onclick="navigator.clipboard.writeText('${e.url}')"></div></td>
                    </tr>`).join("")}
            </table>
        </div>`}),converter.makeHtml(e)};