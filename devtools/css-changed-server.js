// this server only listens for when css files change, and not anything else


const express = require('express')
const app = express()
const fs = require("fs")

app.get("/tApp.js", function (req, res) {
    let file = fs.readFileSync("../src/tApp.js")
    file = file + `
        var uiFile = document.querySelector("[href='./assets/stylesheets/ui.css']");
        const evtSource = new EventSource("/watch/assetspath_seperatorstylesheetspath_seperatorui.css");
        evtSource.onmessage = function(event) {
            let data = JSON.parse(event.data);
            if (data.event === "change") {
                if (!uiFile) uiFile = document.querySelector("[href='./assets/stylesheets/ui.css']");
                uiFile.href="./assets/stylesheets/ui.css?version="+Math.random()
            }
        }
    `
    return res.send(file)
})
app.get("/watch/:file_path", function (req, res) {
    let file = req.params.file_path.replace(/path_seperator/g, "/");
    if (!file) return res.send("You need to specify a file path!")

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with client

    res.write(`data: ${JSON.stringify({
        event: "established-connection"
    })}\n\n`);
    var lastEvent = Date.now();
    const watcher = fs.watch("../src/" + file, function (event, filename) {
        if (lastEvent + 200 > Date.now()) return
        lastEvent = Date.now();
        res.write(`data: ${JSON.stringify({
            filename: filename,
            event: event
        })}\n\n`);
    });

    res.on('close', () => {
        watcher.close();
        res.end();
    });
})



app.use(express.static("../src"))

app.listen(2673, function () {
    console.log("Server listening on port " + 2673)
})