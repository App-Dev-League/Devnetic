const express = require('express');
const app = express();
var cors = require('cors')
const fs = require("fs")
var crypto = require("crypto");

let port = 2248;
app.set('port', port);
app.use(cors())

app.listen(port, () => console.info(`Listening on port ${port}`));
app.use(express.json({limit: '50mb'}));





app.get("/status", function (req, res) {
    return res.send("ok")
})
app.get("/available-files", function (req, res) {
    return res.send(JSON.parse(fs.readFileSync("../src/data/module_index.json")))
})
app.get("/download", (req, res) => {
    let filename = req.query.file + ".json";
    return res.send(JSON.parse(fs.readFileSync(`../src/data/modules/${filename}`)))
})
app.put("/upload", (req, res) => {
    let filename = req.query.file + ".json";
    fs.writeFileSync(`../src/data/modules/${filename}`, JSON.stringify(req.body, null, 4))
    return res.send("ok")
})
app.post("/upload-tmp-image", (req, res) => {
    const buffer = Buffer.from(req.body.data.split(",")[1], "base64");
    const id = crypto.randomBytes(20).toString('hex');
    fs.writeFileSync(`/tmp/mdd-ide-tmp-file-${id}.png`, buffer)
    return res.send(`http://localhost:${port}/img/tmp-file-${id}`)
})
app.put("/save-tmp-image/:id", (req, res) => {
    let id = req.params.id
    fs.renameSync(`/tmp/mdd-ide-tmp-file-${id}.png`, `../src/data/modules/mdd-assets/${id}.png`)
    return res.send("ok")
})
app.get("/img/:id", (req, res) => {
   res.sendFile(`/tmp/mdd-ide-${req.params.id}.png`)
})