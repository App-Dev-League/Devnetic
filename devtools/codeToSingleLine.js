var code = `
{
  "name": "My App",
  "version": "1.0.0",
  "description": "What your package does",
  "main": "index.js",
  "scripts": {
    "startServer": "node index.js"
  }
  "author": "Your Name",
  "dependencies": {
    "axios": "^0.21.1"
  },
  "repository": "your repository url",
  "license": "MIT",
  "keywords": [
    "add",
    "number"
  ]
}
`

if (code.startsWith("\n")) code = code.slice(1)
if (code.endsWith("\n")) code = code.slice(0, -1)
code = code.replace(/\n/g, "\\n")
code = code.replace(/\"/g, '\\"')
console.log(code)