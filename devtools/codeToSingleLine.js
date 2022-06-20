var code = `
<p>
  This is a long paragraph, <br/>
  So I am splitting it into <br/>
  multiple lines.
</p>
`

if (code.startsWith("\n")) code = code.slice(1)
if (code.endsWith("\n")) code = code.slice(0, -1)
code = code.replace(/\n/g, "\\n")
code = code.replace(/\"/g, '\\"')
console.log(code)