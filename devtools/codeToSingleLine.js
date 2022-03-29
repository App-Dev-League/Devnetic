var code = `
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </head>
  <body>
    <input id="url" type="text" placeholder="URL">
    <button onclick="sendRequest()">Sbumit!</button>
    <div id="result"></div>
  </body>
</html>
<script>
  function sendRequest() {
    axios.get(document.getElementById("url").value).then(result => {
      document.getElementById("result").innerHTML = result;
    })
  }
</script>
`

if (code.startsWith("\n")) code = code.slice(1)
if (code.endsWith("\n")) code = code.slice(0, -1)
code = code.replace(/\n/g, "\\n")
code = code.replace(/\"/g, '\\"')
console.log(code)