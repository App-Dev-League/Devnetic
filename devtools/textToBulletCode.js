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
To make the list update every time a user inputs a new item, we need to use React States
Create a React State named “items” and inside it, put our previous “items” variable
Then, pass this React State to the ItemList component. Then, everytime the callback function is called, add a new element to that array and update the state!
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