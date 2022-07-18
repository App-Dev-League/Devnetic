var code = `
app.get("/server-time", async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  for (var x = 0; x < 10; x++) {
    let data = "hello world! The current time is " + Date.now();
    res.write("data: " + data + '\n\n'); // whenever you send two line characters the message is sent automatically
    await sleep(1000);
  }
  return res.end()
})
`

if (code.startsWith("\n")) code = code.slice(1)
if (code.endsWith("\n")) code = code.slice(0, -1)
code = code.replace(/\n/g, "\\n")
code = code.replace(/\"/g, '\\"')
console.log(code)