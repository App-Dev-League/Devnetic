/*
NOTE: If you see a weird icon in terminal, don't worry. It's just because the terminal doesn't have the correct font package.
Just copy everything, and it should be visible in VS CODE or you're favorite code editor
*/
var text = `
We are using the async/await approach for this, and therefore, we are wrapping the statements in an async function
We await the axios.post() call which takes in 3 parameters (we only used 2 here)
The first parameter is the url endpoint of course
The second parameter is the body object that we accessed in the req object earlier
We are passing in the name, email, and username
The last parameter which is optional, are the URL Headers, but we are focus on them later
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
    code.push({
        type: "text",
        content: "➔ "+text[i]
    })
}
console.log(JSON.stringify(code).slice(1,-1))