const codeBlock=require("../components/codeBlock.js"),codeBlockHelper=require("./codeBlocks.js"),MultipleChoice=require("../components/EmbededMultipleChoice.js"),ShortAnswer=require("../components/EmbeddedShortAnswer.js");var converter=new showdown.Converter({extentions:[]});function findPrerenderedComponents(e,i){let t=sha1(e).toString(),s=i.toString().split("\n").filter(e=>!!e);return window.cachedMDDComponents[t]?(s=[s[0],window.cachedMDDComponents[t],s[s.length-1]]).join("\n"):(setTimeout(()=>{window.cachedMDDComponents[t]=document.querySelector(`[tapp-component='${i.id}']`).innerHTML},500),i)}converter.setOption("simpleLineBreaks",!0),window.cachedMDDComponents||(window.cachedMDDComponents={}),module.exports=function u(e){let h=0;return e=(e=(e=(e=(e=(e=(e=(e=(e=(e=e.replace(/```[\S\s]*?```/g,function(e){let i=e.slice(3,e.indexOf("\n"));var t=e.slice(e.indexOf("\n"),-3).trim(),s=i.split("-")[1]?.trim()||"";return"LIVE"===s?`<div class="image-wrapper info-text"><iframe src="#/live-demo/${i.split("-")[0]}/${window.btoa(t)}" style="width: 100%; height: 250px; border-radius: 10px; display: block; margin-left: auto; margin-right: auto;" onload="resizeIframe(this)"></iframe></div>`:`<div class="codeblock-wrapper">
            ${findPrerenderedComponents(e,new codeBlock({code:codeBlockHelper.escapeHtml(t),language:i.split("-")[0],name:s}))}
        </div>`})).replace(/!!\(.*?\)/g,function(e){return`<div class="image-wrapper info-text"><iframe src="${e.slice(3,-1)}" style="width: 100%; height: 400px; border-radius: 10px; display: block; margin-left: auto; margin-right: auto;" onload="resizeIframe(this)"></iframe></div>`})).replace(/!\[.*\]\(.*\)/g,function(e){var i=e.split("]")[0].slice(2),e=e.split("(")[1].slice(0,-1);return console.log(e,i),`<img style="border-radius: 8px" src="${e}" alt="${i}" onclick="openlightbox(this)"> ${i&&`
>`+i} `})).replace(/<Q>.+?<\/Q>/gms,function(e){let i=e.slice(3,-4).split("\n").filter(e=>!!e),t="",s=[],r=[],n=0,o=0,a=0,c="";i.forEach(e=>{let i=e.trim();i.startsWith("?")?t=i.slice(1):i.startsWith("!")?(i.endsWith("*")&&(n=s.length,i=i.slice(0,-1)),s.push(i.slice(1))):i.startsWith("+")?r.push(i.slice(1)):i.startsWith("p:")?o=Number(i.slice(2)):i.startsWith("c:")?a=Number(i.slice(2)):c+=e+"\n"});var l="Multiple Choice Question",d=(s.find(e=>"true"===e.toLowerCase())&&s.find(e=>"false"===e.toLowerCase())&&(l="True or False"),new MultipleChoice({answers:s,correct:n,descriptions:r,points:o,coins:a,elementNum:h},null));return h++,`<div class="multiple-choice-wrapper" onclick="document.querySelector('.stack-width').classList.add('blur-all-non-mc-questions')">
            <div class="indicator-symbol">${l}</div>
            <canvas class="mc-answer-confetti"></canvas>
            <h3 style="margin-top: 10px !important;">${t}</h3>
            ${u(c)}
            ${c.trim()?"":"<br>"}
            ${findPrerenderedComponents(e,d)}
        </div>`})).replace(/<P>.+?<\/P>/gms,function(e){let i=e.slice(3,-4).split("\n").filter(e=>!!e),t="",r="",s=[],n="",o=0,a=0,c="";i.forEach(e=>{let i=e.trim();i.startsWith("?")?t=i.slice(1):i.startsWith("!")?r=i.slice(1):i.startsWith("^")?n=i.slice(1):i.startsWith("+")?s.push(i.slice(1)):i.startsWith("p:")?o=Number(i.slice(2)):i.startsWith("c:")?a=Number(i.slice(2)):c+=e+"\n"});var[l,d,p]=s,l=new ShortAnswer({placeholder:l,correctDescription:d,incorrectDescription:p,graderFunction:e=>{var i=r,t=e,s=i;return n&&(t=Function("response",n.includes("return ")?n:"return "+n)(e),s=Function("response",n.includes("return ")?n:"return "+n)(i)),"boolean"==typeof t?e:t.trim()===s.trim()},points:o,coins:a,elementNum:h},null);return h++,`<div class="multiple-choice-wrapper" onclick="document.querySelector('.stack-width').classList.add('blur-all-non-mc-questions')">
            <div class="indicator-symbol">Short Response Question</div>
            <canvas class="mc-answer-confetti"></canvas>
            <h3 style="margin-top: 10px !important;">${t}</h3>
            ${u(c)}
            ${c.trim()?"":"<br>"}
            ${findPrerenderedComponents(e,l)}
        </div>`})).replace(/N!.*?N!/gs,function(e){let i=e.slice(2,-2),t="Note:";return i.startsWith("-")&&(t=i.slice(1,i.indexOf("\n")),i=i.slice(i.indexOf("\n"))),`<div class="info-annotation info-note">
            <div>
                <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"></path></svg>
                <span>${t}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(i)}</pre>
        </div>
        `})).replace(/W!.*?W!/gs,function(e){let i=e.slice(2,-2),t="Warning!";return i.startsWith("-")&&(t=i.slice(1,i.indexOf("\n")),i=i.slice(i.indexOf("\n"))),`<div class="info-annotation info-warning">
            <div>
            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"></path></svg>                <span>${t}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(i)}</pre>
        </div>
        `})).replace(/E!.*?E!/gs,function(e){let i=e.slice(2,-2),t="Error!";return i.startsWith("-")&&(t=i.slice(1,i.indexOf("\n")),i=i.slice(i.indexOf("\n"))),`<div class="info-annotation info-error">
            <div>
            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"></path></svg>             <span>${t}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(i)}</pre>
        </div>
        `})).replace(/T!.*?T!/gs,function(e){let i=e.slice(2,-2),t="Tip:";return i.startsWith("-")&&(t=i.slice(1,i.indexOf("\n")),i=i.slice(i.indexOf("\n"))),`<div class="info-annotation info-tip">
            <div>
            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"></path></svg>             <span>${t}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(i)}</pre>
        </div>
        `})).replace(/<R>.+?<\/R>/gms,function(e){let t,i=e.slice(3,-4).split("\n").filter(e=>!!e),s=[];return i.forEach(e=>{let i=e.trim();if(!i.startsWith("|"))return t=i;i&&(i=i.split("|").filter(e=>!!e),s.push({sourcename:i[0],title:i[1],description:i[2],url:i[3]}))}),`<div class="resource-list-wrapper">
            <span class="resource-list-title">${t||"Resources"}</span>
            <table>
                ${s.map(e=>`<tr>
                    <td class="sourcename">${e.sourcename}</td>
                    <td class="sourcetitle"><a target="_blank" href="${e.url}">${e.title}</a></td>
                    <td class="sourcedescription">${e.description}</td>
                    <td><div class="codicon codicon-copy" onclick="navigator.clipboard.writeText('${e.url}')"></div></td>
                    </tr>`).join("")}
            </table>
        </div>`}),`<div class="mdd-render">${converter.makeHtml(e)}</div>`};