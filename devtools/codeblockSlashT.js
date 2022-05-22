const fs = require("fs");

const folders = ["ai", "intro-to-cs", "webdev", "webdev-projects"];



String.prototype.replaceAll = function (find, replace){
    var regex = new RegExp(find,'g');
    return this.replace(regex, replace)
  }
folders.forEach(folder => {
    console.log("Starting to process files in topic " + folder);
    folder = "../src/data/modules/" + folder;
    const files = fs.readdirSync(folder);
    files.forEach(file => {
        let contents = fs.readFileSync(folder + "/" + file, "utf8");
        contents = JSON.parse(contents);
        for (let i in contents.pages) {
            for (let p in contents.pages[i].elements) {
                if (contents.pages[i].elements[p].type === "code") {
                    contents.pages[i].elements[p].content = contents.pages[i].elements[p].content.replaceAll("    ", "\t");
                    contents.pages[i].elements[p].content = contents.pages[i].elements[p].content.replaceAll("  ", "\t");
                }
            }
        }
        fs.writeFileSync(folder + "/" + file, JSON.stringify(contents, null, 4));
        console.log("Finished processing file " + file + " in module " + folder);
    })
})
