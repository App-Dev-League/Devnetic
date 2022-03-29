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
Great! Now what if we need to install a NPM package? We can either use 
npm install \`packageName\` or we can use the command npm install, which reads your package.json and installs all of the dependencies listed inside of it.
NPM is a really versatile application. You can also create “shortcuts” to commands with a package.json. If you want to run a JS file, but forget what it’s called, you can list a command under “scripts” inside of your package.json, and then run it with npm run {scriptName}
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