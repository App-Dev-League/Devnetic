const codeBlock = require("../components/codeBlock.js");
const codeBlockHelper = require("./codeBlocks.js");
const MultipleChoice = require("../components/EmbededMultipleChoice.js")


var converter = new showdown.Converter({ extentions: [] });
converter.setOption('simpleLineBreaks', true);




if (!window.cachedMDDComponents) window.cachedMDDComponents = {}
// component caching is super important for not getting seizures everytime you make a change in the MDD IDE;
// it works by looking at the content of any tApp MDD Component (codeblocks, multiple choice questions, etc), and hashing it. 
// this hash is the key for the entry in the window.cachedMDDComponents object.
// We then wait for tApp to actually render the component, and then document.getElementByID().innerHTML the component and slap it into the object as the value of the hash
// then, on subsequent render runs, we hash the value of the component and see if it's in the cachedComponents object. if it is, then we just directly slap in the rendered HTML
// however, this HTML isn't interactable (because it's not an actual tApp component, just some pre-rendered HTML) So, we also initiate the component, and as soon as the component actually renders, we delete the placeholder HTML


// In conclusion, this system is very similar to how frameworks like Next.JS "hydrate" components. It SSRs the component and gets non-interactable HTML. 
// It ships it to the frontend, and then the frontend will then load the JS at its own pace.


module.exports = function renderMdd(mddString) {
    let multipleChoiceID = 0;


    mddString = mddString.replace(/```[\S\s]*?```/g, function (e) {
        let language = e.slice(3, e.indexOf("\n"))
        let content = e.slice(e.indexOf("\n"), -3).trim()
        let component = new codeBlock({ code: codeBlockHelper.escapeHtml(content), language: language.split("-")[0], name: language.split("-")[1] || "" })
        return `<div class="codeblock-wrapper">
            ${findPrerenderedComponents(e, component)}
        </div>`
    })
    mddString = mddString.replace(/!!\(.*?\)/g, function (e) {
        let url = e.slice(3, -1)
        return `<div class="image-wrapper info-text"><iframe src="${url}" style="width: 100%; height: 400px; border-radius: 10px; display: block; margin-left: auto; margin-right: auto;" onload="resizeIframe(this)"></iframe></div>`
    })
    mddString = mddString.replace(/!\[.*\]\(.*\)/g, function (e) {
        let description = e.split("]")[0].slice(2)
        let url = e.split("(")[1].slice(0, -1)
        console.log(url, description)
        return `<img style="border-radius: 8px" src="${url}" alt="${description}" onclick="openlightbox(this)"> ${description && `\n>${description}`} `
    })
    mddString = mddString.replace(/<Q>.+?<\/Q>/gms, function (e) {
        let content = e.slice(3, -4).split("\n").filter(p => !!p);

        let question = ""
        let answers = []
        let descriptions = []
        let correctAnswer = 0;
        let points = 0;
        let coins = 0;

        let additionalMDD = ""

        content.forEach(p => {
            let command = p.trim();
            if (command.startsWith("?")) question = command.slice(1);
            else if (command.startsWith("!")) {
                if (command.endsWith("*")) { correctAnswer = answers.length; command = command.slice(0, -1) }
                answers.push(command.slice(1))
            }
            else if (command.startsWith("+")) descriptions.push(command.slice(1))
            else if (command.startsWith("p:")) points = Number(command.slice(2));
            else if (command.startsWith("c:")) coins = Number(command.slice(2));
            else additionalMDD+=p+"\n"
        })



        var text = "Multiple Choice Question"
        if (answers.find(e => e.toLowerCase() === "true") && answers.find(e => e.toLowerCase() === "false")) text = "True or False"

        const multipleChoiceElement = new MultipleChoice({ answers: answers, correct: correctAnswer, descriptions: descriptions, points: points, coins: coins, elementNum: multipleChoiceID }, null)
        multipleChoiceID++
        return `<div class="multiple-choice-wrapper" onclick="document.querySelector('.stack-width').classList.add('blur-all-non-mc-questions')">
            <div class="indicator-symbol">${text}</div>
            <canvas class="mc-answer-confetti"></canvas>
            <h3 style="margin-bottom: 0">${question}</h3>
            ${renderMdd(additionalMDD)}
            <br>
            ${findPrerenderedComponents(e, multipleChoiceElement)}
        </div>`
    })
    mddString = mddString.replace(/N!.*?N!/gs, function (e) {
        let content = e.slice(2, -2);
        let title = "Note:"
        if (content.startsWith("-")) { title = content.slice(1, content.indexOf("\n")); content = content.slice(content.indexOf("\n")) }
        return `<div class="info-annotation info-note">
            <div>
                <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"></path></svg>
                <span>${title}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(content)}</pre>
        </div>
        `
    })
    mddString = mddString.replace(/W!.*?W!/gs, function (e) {
        let content = e.slice(2, -2);
        let title = "Warning!"
        if (content.startsWith("-")) { title = content.slice(1, content.indexOf("\n")); content = content.slice(content.indexOf("\n")) }
        return `<div class="info-annotation info-warning">
            <div>
            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"></path></svg>                <span>${title}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(content)}</pre>
        </div>
        `
    })
    mddString = mddString.replace(/E!.*?E!/gs, function (e) {
        let content = e.slice(2, -2);
        let title = "Error!"
        if (content.startsWith("-")) { title = content.slice(1, content.indexOf("\n")); content = content.slice(content.indexOf("\n")) }
        return `<div class="info-annotation info-error">
            <div>
            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"></path></svg>             <span>${title}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(content)}</pre>
        </div>
        `
    })
    mddString = mddString.replace(/T!.*?T!/gs, function (e) {
        let content = e.slice(2, -2);
        let title = "Tip:"
        if (content.startsWith("-")) { title = content.slice(1, content.indexOf("\n")); content = content.slice(content.indexOf("\n")) }
        return `<div class="info-annotation info-tip">
            <div>
            <svg viewBox="0 0 24 24" focusable="false" class="chakra-icon css-onkibi"><path fill="currentColor" d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"></path></svg>             <span>${title}</span>
            </div>
            <pre style="line-height: 1.2; margin: 0">${converter.makeHtml(content)}</pre>
        </div>
        `
    })
    mddString = mddString.replace(/<R>.+?<\/R>/gms, function (e) {
        let name;
        let content = e.slice(3, -4).split("\n").filter(p => !!p);

        let sources = []

        content.forEach(p => {
            let command = p.trim();
            if (!command.startsWith("|")) return name = command;
            if (!command) return
            command = command.split("|").filter(e => !!e);
            sources.push({
                sourcename: command[0],
                title: command[1],
                description: command[2],
                url: command[3]
            })
        })

        return `<div class="resource-list-wrapper">
            <span class="resource-list-title">${name || "Resources"}</span>
            <table>
                ${sources.map(e => `<tr>
                    <td class="sourcename">${e.sourcename}</td>
                    <td class="sourcetitle"><a target="_blank" href="${e.url}">${e.title}</a></td>
                    <td class="sourcedescription">${e.description}</td>
                    <td><div class="codicon codicon-copy" onclick="navigator.clipboard.writeText('${e.url}')"></div></td>
                    </tr>`).join("")}
            </table>
        </div>`

    })

    let html = converter.makeHtml(mddString)


    return html
}


function findPrerenderedComponents(componentContent, element) {
    let hash = sha1(componentContent).toString();

    let preparedElement = element.toString().split("\n").filter(e => !!e);

    if (window.cachedMDDComponents[hash]) {
        preparedElement = [preparedElement[0], window.cachedMDDComponents[hash], preparedElement[preparedElement.length-1]]
        return preparedElement.join("\n")
    } else {
        setTimeout(() => {
            window.cachedMDDComponents[hash] = document.querySelector(`[tapp-component='${element.id}']`).innerHTML
        }, 500)
        return element;
    }
}
