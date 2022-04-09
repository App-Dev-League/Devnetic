/*
NOTE: If you see a weird icon in terminal, don't worry. It's just because the terminal doesn't have the correct font package.
Just copy everything, and it should be visible in VS CODE or you're favorite code editor
*/
// var text = `
// Almost exactly like HTML
//     Few minor differences
//     Differences allow for more functionality
//     All HTML attributes get camelCased
//         onclick turns into onClick
// The user can display variables in JSX syntax
//     Allows to dynamically render content
// `
var text = `
So what is CORS? Well CORS is a thing that keeps the internet safe. It blocks requests from domains that are not it’s own.
If, for some reason, you wanted to allow requests from all domains to your server, you first need another package: “cors”, and then import it into your program. Then, app.use(cors()) 
If you would like to allow cors for a 
specific domain, use app.use(cors({origin: “yourdomain”}))
`

String.prototype.replaceAll = function (find, replace) {
    var regex = new RegExp(find, 'g');
    return this.replace(regex, replace)
}
if (text.indexOf("\n") === 0) text = text.slice(1)
if (text.lastIndexOf("\n") === text.length - 1) text = text.slice(0, -1)
text = text.split("\n")
var code = []
for (i = 0; i < text.length; i++) {
    if (text[i].startsWith("        ")) {
        code.push({
            type: "text",
            content: "[[ ]][[ ]][[ ]][[ ]]● "+text[i].slice(8)
        })
    }else if (text[i].startsWith("    ")) {
        code.push({
            type: "text",
            content: "[[ ]][[ ]]◆ "+text[i].slice(4)
        })
    }else{
        code.push({
            type: "text",
            content: "➔ "+text[i]
        })
    }
}
console.log(JSON.stringify(code).slice(1,-1))