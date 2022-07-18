const fs = require("fs");
var dictionary = require('dictionary-en')
var nspell = require('nspell')
var errors = 0;
var problemWords = {}



const customWords = [
    "javascript", "repl", "css", "html", "js", "html5", "htmlcssjs","php", "nodejs","replitcom","doctype", "charset", "seo", "h1",  "utf8",  "cssjavascript", "href", "lili", "ulul", "unpairedselfclosing", "lightpurplep", "ctrls", "bootstrap's", "cdn", "jsdelivr", "clientside", "serverside", "popups", "taskload", "dom", "bigint", "divs", "webpage", "parsers", "fontfamily", "textalign", "JSX", "frontend", "backend", "React's", "onclick", "br", "img", "ReactJS", "navbar", "HTMLJSX", "replit", "filesystem", "lifecycle", "keysvalue", "camelCased", "yourStuff", "forloop", "arraymap", "Devnetic", "NPM", "npm", "EJS", "axios", "async", "CORS", "Reachability", "req", "res", "eval", "ekey", "ie", "indexjs", "ExpressJS", "rerender", "rerenders", "init", "2D", "1D", "0s", "NLP", "LOF", "LRD",
    // machine-generated words
    ,'fontsize','Xoffset','Yoffset','rgbred','1s','3s','prebuilt','sm','CDNs','letvar','andor','bye',"'",'Booleans','y','jQuery','webpages','url','JQuery','initto','CommonJS','ES6','fs','Expressjs','APIs','ressend','filenamejs','reqbody','etcThese',"parametersaxiosgethttpsservercomendpointid123dogtype'",'reqquery','const',"SSEsSSE's",'localhost3001servertime','UI','ReactDOM','mainjsx','src','reusability','moodhi','getset','keysvalues','onscroll','onScroll','myFunction','onChange',"another's",'component1','headhead','bodybody','ul','li','ol','youtube','nav','libs','madLibs','Eg','del','clearVal','stylecss','calc','400px','JSON','num1','num2','testingjs','READMEmd','ok',"express'",'number1','number2','expressjs','templating','toString','dev','cors','Displayer','DevTools','ToDo','elementkey','addItem','AddItem',"whatever's",'textbox','ItemList','absx','seq1','seq2','lenseq','2Darray','ifthen','eb','elif','infinte','unindent','OOP','Prebuilt','Subfield','Labelled','unlabelled','YesNo','Unlabelled','SVMs','mx','m1x1','m2x2','m3x3','mnxn','ndimensional','yvalue','OLS','Vapnik','SVM','XGBoost','overfit','Sigmoid','ReLu','recommender','RGB','HSV','subfields','Embeddings','embeddings','Onehot','ELMo','subfield','finegrain','SMT','Rulebased','RBMT','HMT','NMT','Modelling','GPT3','modelling','RNNs','biLSTMs','RNN','MLM','NSP','onehot','PoS','biLSTMS','Kmeans','DBSCAN','Hebbian','GANs','KMeans','knearest','Kdistance','Kth','reachability','LOFs','codings','sklearn','pythagorean','isare','encodings'
    ,'pHello','worldp','etcex','webpage\'s','pxyz','xyz','\'\'','10px','\'shadow\'','rgb','\'bye\'','00001Booleans','\'y\'','Mathmax','0You','toYou','pageSome','squar','package1','camelCases','classNames','linkCSS','240Explanation','overAdd','CSSAs','propsTo','pageAs','readyWe','Recode','absolutex','Myelin','Multiplicatives','0Activation','ReLuUsing','superset','CNNs','workWhy','workWord','k2','center4'
]

String.prototype.replaceAll = function (find, replace) {
    var regex = new RegExp(find, 'g');
    return this.replace(regex, replace)
}


dictionary(main)


async function main(err, dict) {
    if (err) throw err
    var spell = nspell(dict)
    customWords.forEach(e => spell.add(e))

    var dirs = ["webdev", "webdev-projects", "ai"]
    dirs.forEach(dir => {
        fs.readdirSync("../src/data/modules/" + dir).forEach(file => {
            console.log("Reading file: " + file)
            let testFile = fs.readFileSync(`../src/data/modules/${dir}/${file}`, "utf8");
            testFile = JSON.parse(testFile);
            testFile.pages.forEach(page => {
                spellcheck(page.title, file, spell)
                if (!page.elements) return;
                page.elements.forEach(element => {
                    if (element.type === "text") spellcheck(element.content, file, spell)
                    if (element.type && element.type.endsWith("multiple_choice")) {
                        spellcheck(element.question, file, spell)
                        element.answers.forEach(answer => {
                            spellcheck(answer, file, spell)
                        })
                        element.descriptions.forEach(descriptions => {
                            spellcheck(descriptions, file, spell)
                        })
                    }
                })
            })
        })
    })
    console.log("Total errors: " + errors)
    console.log("Wrote all errored words to ./problemWords.txt. If you are confident that ALL these words are actually fine, then simply copy the output of this and append it into the customWords variable in spellcheck.js")
    
    var problemWordsString = ""
    Object.entries(problemWords).forEach(([key, value]) => {
        problemWordsString += `,'${key}'`
    })
    fs.writeFileSync("./problemWords.txt", JSON.stringify(problemWordsString))
}


function spellcheck(text, file, spell) {
    if (!text) return true;
    var unfilteredText = text;
    text = text.replace(/\[\[.{0,6}\]\]/g, "").replace(/[^a-zA-Z0-9 ' ’]/g, "").replaceAll("➔", "").replaceAll("◆", "").replaceAll("●", "").replaceAll("’", "'")
    var words = text.replaceAll("-", "").split(" ")
    if (!words) return true;
    for (let i in words) {
        var word = words[i]
        if (!word) continue;

        // Checking if the word is correct, or if word is really really weird. If it is, then it probably is intentional. For example: parametersaxiosgethttpsservercomendpointid123dogtype or axiospost
        if (spell.suggest(word).length !== 0) {
            var recommendedAction = ""
            if (word.includes("monospac") || word.includes("attribute") || word.includes("lightpurple")) continue;
            if (word.endsWith("ex")) recommendedAction = "Consider adding a space between the previous word and '(ex.'"
            if (!isNaN(word)) continue;


            console.log(`Word: \x1b[31m${word}\x1b[0m`, `Located in: \x1b[32m${unfilteredText.slice(0, 100)}...\x1b[0m`, `In file: \x1b[36m${file}\x1b[0m`, recommendedAction)
            errors++
            problemWords[word] = true
        }
    }
}
