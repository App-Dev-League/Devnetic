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
	return template;
}

module.exports = codeTemplateToCode;