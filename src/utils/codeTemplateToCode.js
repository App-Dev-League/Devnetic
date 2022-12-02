function codeTemplateToCode(template) {
	template = tApp.escape(template);
	template = template.replaceAll("[[/]]", '</span>');
	template = template.replaceAll("[[red]]", '<span class="c-red">');
	template = template.replaceAll("[[darkred]]", '<span class="c-darkred">');
	template = template.replaceAll("[[lightorange]]", '<span class="c-lightorange">');
	template = template.replaceAll("[[orange]]", '<span class="c-orange">');
	template = template.replaceAll("[[darkorange]]", '<span class="c-darkorange">');
	template = template.replaceAll("[[yellow]]", '<span class="c-yellow">');
	template = template.replaceAll("[[green]]", '<span class="c-green">');
	template = template.replaceAll("[[darkgreen]]", '<span class="c-darkgreen">');
	template = template.replaceAll("[[turquoise]]", '<span class="c-turquoise">');
	template = template.replaceAll("[[darkturquoise]]", '<span class="c-darkturquoise">');
	template = template.replaceAll("[[lightblue]]", '<span class="c-lightblue">');
	template = template.replaceAll("[[blue]]", '<span class="c-blue">');
	template = template.replaceAll("[[lightpurple]]", '<span class="c-lightpurple">');
	template = template.replaceAll("[[purple]]", '<span class="c-purple">');
	template = template.replaceAll("[[white]]", '<span class="c-white">');
	template = template.replaceAll("[[lightgray]]", '<span class="c-lightgray">');
	template = template.replaceAll("[[gray]]", '<span class="c-gray">');
	template = template.replaceAll("[\\[", '[[');
	template = template.replaceAll("[[b]]", '<span class="c-bold">');
	template = template.replaceAll("[[h3]]", '<span class="c-h3">');
	template = template.replaceAll("[[h4]]", '<span class="c-h4">');
	template = template.replaceAll("[[h5]]", '<span class="c-h5">');
	template = template.replaceAll("[[h6]]", '<span class="c-h6">');
	template = template.replaceAll("[[monospace]]", '<span class="c-monospace">');
	template = template.replaceAll("[[`]]", '<span class="c-monospace">');
	template = template.replaceAll("[[ ]]", '&nbsp;&nbsp;&nbsp;&nbsp;');
	template = template.replaceAll("[[a]]", "<a target='_blank' class='generated-link url' data-linked='no''>")
	template = template.replaceAll("[[/a]]", "</a>")
	template = template.replaceAll(/\[\[link=(.*?)\]\]/g, e => {
		var shouldOpenNewTab = true;
		if (e.replaceAll('[[link=', '').replaceAll(']]', '').startsWith("#")) shouldOpenNewTab = false;
		return `<a ${shouldOpenNewTab ? "target='_blank'" : ""} class='generated-link url' data-linked='yes' href='${e.replaceAll('[[link=', '').replaceAll(']]', '')}'>`;
	})
	template = template.replaceAll("[[/link]]", "</a>")
	return template;
}

module.exports = codeTemplateToCode;