const express = require('express');
const app = express();
var cors = require('cors')
const fs = require("fs")

let port = 2248;
app.set('port', port);
app.use(cors())

app.listen(port, () => console.info(`Listening on port ${port}`));
app.use(express.json());





app.get("/status", function(req, res) {
    return res.send("ok")
})
app.get("/available-files", function(req, res) {
    return res.send(JSON.parse(fs.readFileSync("../src/data/module_index.json")))
})
app.get("/download", (req, res) => {
    let filename = req.query.file+".json";
    return res.send(JSON.parse(fs.readFileSync(`../src/data/modules/${filename}`)))
})
app.put("/upload", (req, res) => {
    let filename = req.query.file+".json";
    fs.writeFileSync(`../src/data/modules/${filename}`, JSON.stringify(req.body, null, 4))
    return res.send("ok")
})