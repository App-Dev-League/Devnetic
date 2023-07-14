const ModuleComponent=require("./ModuleComponent.js"),ExplanationModal=require("./ExplanationModal.js"),Input=require("./Input.js"),codeBlock=require("./codeBlock.js");class ShortAnswer extends ModuleComponent{constructor(t,e){super(t,e)}render(t){if(null==this.data())return"<div></div>";null==this.state.explanation?this.state.explanation=new ExplanationModal({points:this.data().points,coins:this.data().coins},this):(this.state.explanation.state.points=this.data().points,this.state.explanation.state.coins=this.data().coins),null==this.state.input&&(this.state.input=new Input({classList:["short-answer-input"],type:"text",properties:{autofocus:"",onkeyup:"{{_this}}.state.update()"},update:()=>{"Enter"===event.key&&this.update()}},this)),null==this.data().value&&(this.data().value="");var e=`<div class="information-wrapper animate-out">
		<div class="stack-width-wrapper">
		<div class="stack-width">
	<h1 class="mc-question">${tApp.escape(this.data().question||"")}</h1>
	<div class="codeblock-wrapper mc-codeblock">
		${new codeBlock({code:this.data().code||"",language:this.data().lang,name:this.data().name})}

	</div>
	<div class="short-answer-container">
		${this.state.input}
		<button class="short-answer-button" onclick="{{_this}}.update();">Submit</button>
	</div>
	</div>
	</div>`;if(null!=this.data().selectedAnswer){let t=this.data();this.state.explanation.state.description=t.descriptions[t.selectedAnswer]||t.description_default,t.answers.map(t=>t.toLowerCase()).includes(t.selectedAnswer.toLowerCase())?(this.state.explanation.state.title="Correct!",this.state.explanation.state.retry=!1):(this.state.explanation.state.title="Incorrect!",this.state.explanation.state.retry=!0)}else this.state.explanation.state.title="";return e+"<div>"+this.state.explanation.toString()+"</div></div>"}update(){this.parent.setState("data.selectedAnswer",this.state.input.state.value)}closeModal(){this.parent.setState("data.selectedAnswer",null)}}module.exports=ShortAnswer;