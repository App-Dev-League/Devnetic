const codeBlock = require("../components/codeBlock.js");
const codeBlockHelper = require("./codeBlocks.js");
const MultipleChoice = require("../components/EmbededMultipleChoice.js")


var converter = new showdown.Converter({ extentions: [] });



module.exports = function renderMdd(mddString) {
    let multipleChoiceID = 0;


    mddString = mddString.replace(/```[\S\s]*?```/g, function (e) {
        let language = e.slice(3, e.indexOf("\n"))
        let content = e.slice(e.indexOf("\n"), -3)
        return `<div class="codeblock-wrapper">
            ${new codeBlock({ code: codeBlockHelper.escapeHtml(content), language: language.split("-")[0], name: language.split("-")[1] || "" })}
        </div>`
    })
    mddString = mddString.replace(/!!\(.*\)/g, function (e) {
        let url = e.slice(3, -1)
        return `<div class="image-wrapper info-text"><iframe src="${url}" style="width: 100%; height: 400px; border-radius: 10px; display: block; margin-left: auto; margin-right: auto;" onload="resizeIframe(this)"></iframe></div>`
    })
    mddString = mddString.replace(/<Q>.+?<\/Q>/gms, function (e) {
        let content = e.slice(3, -4).split("\n").filter(p => !!p);

        let question = ""
        let answers = []
        let descriptions = []
        let correctAnswer = 0;
        let points = 0;
        let coins = 0;

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
        })



        var text = "Multiple Choice Question"
        if (answers.find(e => e.toLowerCase() === "true") && answers.find(e => e.toLowerCase() === "false")) text = "True or False"

        const multipleChoiceElement = new MultipleChoice({ answers: answers, correct: correctAnswer, descriptions: descriptions, points: points, coins: coins, elementNum: multipleChoiceID }, null)
        multipleChoiceID++
        return `<div class="multiple-choice-wrapper" onclick="document.querySelector('.stack-width').classList.add('blur-all-non-mc-questions')">
            <div class="indicator-symbol">${text}</div>
            <canvas class="mc-answer-confetti"></canvas>
            <h3>${question}</h3>
            ${multipleChoiceElement}
        </div>`
    })
    let html = converter.makeHtml(mddString)
    return html
}

