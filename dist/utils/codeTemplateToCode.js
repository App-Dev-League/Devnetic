function codeTemplateToCode(l){return l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=tApp.escape(l)).replaceAll("[[/]]","</span>")).replaceAll("[[red]]",'<span class="c-red">')).replaceAll("[[darkred]]",'<span class="c-darkred">')).replaceAll("[[lightorange]]",'<span class="c-lightorange">')).replaceAll("[[orange]]",'<span class="c-orange">')).replaceAll("[[darkorange]]",'<span class="c-darkorange">')).replaceAll("[[yellow]]",'<span class="c-yellow">')).replaceAll("[[green]]",'<span class="c-green">')).replaceAll("[[darkgreen]]",'<span class="c-darkgreen">')).replaceAll("[[turquoise]]",'<span class="c-turquoise">')).replaceAll("[[darkturquoise]]",'<span class="c-darkturquoise">')).replaceAll("[[lightblue]]",'<span class="c-lightblue">')).replaceAll("[[blue]]",'<span class="c-blue">')).replaceAll("[[lightpurple]]",'<span class="c-lightpurple">')).replaceAll("[[purple]]",'<span class="c-purple">')).replaceAll("[[white]]",'<span class="c-white">')).replaceAll("[[lightgray]]",'<span class="c-lightgray">')).replaceAll("[[gray]]",'<span class="c-gray">')).replaceAll("[\\[","[[")).replaceAll("[[b]]",'<span class="c-bold">')).replaceAll("[[h3]]",'<span class="c-h3">')).replaceAll("[[h4]]",'<span class="c-h4">')).replaceAll("[[h5]]",'<span class="c-h5">')).replaceAll("[[h6]]",'<span class="c-h6">')).replaceAll("[[monospace]]",'<span class="c-monospace">')).replaceAll("[[`]]",'<span class="c-monospace">')).replaceAll("[[ ]]","&nbsp;&nbsp;&nbsp;&nbsp;")).replaceAll("[[a]]","<a target='_blank' class='generated-link url' data-linked='no''>")).replaceAll("[[/a]]","</a>")).replaceAll(/\[\[link=(.*?)\]\]/g,l=>`<a target='_blank' class='generated-link url' data-linked='yes' href='${l.replaceAll("[[link=","").replaceAll("]]","")}'>`)).replaceAll("[[/link]]","</a>")}module.exports=codeTemplateToCode;