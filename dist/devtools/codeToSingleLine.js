var code=(code=(code=(code=(code=`
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
`).startsWith("\n")?code.slice(1):code).endsWith("\n")?code.slice(0,-1):code).replace(/\n/g,"\\n")).replace(/\"/g,'\\"');console.log(code);