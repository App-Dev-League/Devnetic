var code = `
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>My test page</title>
</head>

<body>
  <p>This is my page</p>
</body>

</html>
`

if (code.startsWith("\n")) code = code.slice(1)
if (code.endsWith("\n")) code = code.slice(0, -1)
code = code.replace(/\n/g, "\\n")
code = code.replace(/\"/g, '\\"')
console.log(code)