function updateAllCodeBlocks(){
    hljs.highlightAll();
    return true;
}
function updateCodeBlock(element){
    if (!element) return false
    if (element.getAttribute('data-compiled') === "true") return false
    hljs.highlightElement(element);
    element.dataset.compiled = "true";
    return true
}
function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
module.exports = {updateAllCodeBlocks, updateCodeBlock, escapeHtml};