function compileSnippet(snippet, params) {
	let attributes = {};
	for(let i = 0; i < snippet.attributes.length; i++) {
		attributes[snippet.attributes[i].id] = params[i];
	}

	return tApp.compileTemplate(snippet.html, {
		snippet: {
			attributes: attributes
		}
	});
}

module.exports = compileSnippet;