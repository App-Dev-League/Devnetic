const ModuleComponent=require("./ModuleComponent.js"),ExplanationModal=require("./ExplanationModal.js"),MultipleChoiceOption=require("./MultipleChoiceOption.js"),codeBlock=require("./codeBlock.js");class MultipleChoice extends ModuleComponent{constructor(t,e){super(t,e),null==this.state.options&&(this.state.options={}),null==this.state.options[0]&&(this.state.options[0]=new MultipleChoiceOption({index:0},this)),null==this.state.options[1]&&(this.state.options[1]=new MultipleChoiceOption({index:1},this)),null==this.state.options[2]&&(this.state.options[2]=new MultipleChoiceOption({index:2},this)),null==this.state.options[3]&&(this.state.options[3]=new MultipleChoiceOption({index:3},this))}render(t){if(null==this.data()||null==this.data().question)return"<div></div>";null==this.state.explanation?this.state.explanation=new ExplanationModal({points:this.data().points,coins:this.data().coins},this):(this.state.explanation.state.points=this.data().points,this.state.explanation.state.coins=this.data().coins);var e=`<div>
	<h1 class="mc-question">${tApp.escape(this.data().question||"")}</h1>
	<div class="mc-codeblock codeblock-wrapper">
		${new codeBlock({code:this.data().code||"",language:this.data().lang})}
	</div>
	<div class="mc-answer-table">
		<div class="mc-answer-container">
			${this.state.options[0]}
			${this.state.options[1]}
			${this.state.options[2]}
			${this.state.options[3]}
		</div>
	</div>`;if(null!=this.data().selectedAnswer){let t=this.data();this.state.explanation.state.description=t.descriptions[t.selectedAnswer],t.selectedAnswer==t.correct||Array.isArray(t.correct)&&t.correct.includes(t.selectedAnswer)?(this.state.explanation.state.title="Correct!",this.state.explanation.state.retry=!1):(this.state.explanation.state.title="Incorrect!",this.state.explanation.state.retry=!0)}else this.state.explanation.state.title="";return e+"<div>"+this.state.explanation.toString()+"</div></div>"}closeModal(){this.parent.setState("data.selectedAnswer",null)}}module.exports=MultipleChoice;