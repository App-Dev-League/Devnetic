

# Lesson Creation
The markup language that we use: .mdd (markdown devnetic) powers every lesson on Devnetic, and brings Devnetic Elements into markdown. It extends the standard Markdown Syntax with Devnetic Elements. All aspects of MDD is optimized for fast and easy content integration.
## JSON Syntax
### Modules:
Modules are described by large MDD files that include multiple pages. 
```typescript
{
	"type": "lesson" || "project",
	"pages": PageObject[]
}
```
### Pages:
Pages are each individual page inside of a lesson/module
```typescript
{
	"type": "information",
	"title": "The Purpose of OOP",
	"elements": [ElementObjects] // this is deprecated! Please don't use it
	"mdd": "MDD string with quotes escaped because it's all in a JSON"
}
```
## MDD Syntax
*MDD Extends all Markdown syntax!*
### Components
 **Divider Line**: `----` (four or more dash symbols, so `--------` would also work)
 **Iframe**: `!!(url)`
 **Embedded Multiple Choice**: 
 ```jsx
 <Q>
	 ?How do you do something?? // question goes between ?
	 !Answer1! // potential answers go in between !!
	 !Answer2!
	 !Answer3!* // correct answer is appended by a star *
	 !Answer4!
	 +Description1+ // descriptions go in between ++; Every answer must have a corresponding description. 
	 +Description2+
	 +Description3+
	 +Description4+
	 p: 5 // optional, describes points awarded. Default: 5
	 c: 1 // optional, describes coins awarded. Default: 1
	 Anything else will be rendered as normal MDD
	 Stick codeblocks, bullet points, and more, to be rendered inside of the question
 </Q>
 ```
 **Resources List**: 	
 ```markdown
<R>
	|sourcename|resource title|resource description|resource url|
	|sourcename|resource title|resource description|resource url|
	|sourcename|resource title|resource description|resource url|
</R>
```
 **Asterix**: `A!Your asterix tooltip goes hereA!`


 ### The following components support custom names:
 To use custom names, simply append a `-` after the component delimiter. Then, on the next line, start your actual content.\
 For example:
 ```
 ```js-Hello.js
	console.log("Hello World")
 ```ㅤ
 ```
Or,
```
E!-Very Important!!!
You need to do this before you do anything else!
E!
```
 **Code Block**:
```
```langname
content
```\
```
 **Note**:  `N!Your green note goes hereN!` - 
 **Warning**:  `W!Your yellow warning goes hereW!`
 **Tip**:  `T!Your blue tip goes hereT!`
 **Error**:  `E!Your red error goes hereE!`


  

## MDD IDE
The MDD IDE is a powerful WYSIWYG editor. It drastically improves your productivity, as you now don't have to go into each JSON file, copy the mdd attribute, paste into a .md file, make your changes, and then remove all line breaks. \
The IDE does all this for you, and even gives you a live preview of what's going on.
### Usage:
1) First, clone the repository and navigate to the devtools folder. 
2) Run `npm install` to install dependencies
3) Start the local server with the command: `node mddideserver` 
4) Navigate to https://devnetic.appdevleague.org/app/index.html#/mdd-ide
5) Start editing!