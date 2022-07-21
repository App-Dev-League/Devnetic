const ModuleComponent=require("./ModuleComponent.js"),ExplanationModal=require("./ExplanationModal.js"),codeTemplateToCode=require("../utils/codeTemplateToCode.js");class EmbededMultipleChoice extends ModuleComponent{constructor(t,e){super(t,e)}handleOptionClick(t){"incorrect_chosen"!==this.parent.state.options[t].status&&(this.state.explanation.state.description=this.state.descriptions[t],t===this.state.correct?(this.state.explanation.state.title="Correct!",this.state.explanation.state.retry=!1,this.parent.state.options[t].status="correct_chosen"):(this.state.explanation.state.title="Incorrect!",this.state.explanation.state.retry=!0,this.parent.state.options[t].status="incorrect_chosen"),this.setState("options",this.state.options))}correct(){var t;this.state.explanation.setState("title",""),!0!==this.parent.state.alreadyCorrectAnswer&&(this.parent.state.alreadyCorrectAnswer=!0,tApp.getComponentFromDOM(document.querySelector(".stack-width")).increaseCompletedQuestions(),(t=document.querySelector(`[tapp-component="${this.id}"]`).parentElement.parentElement.querySelector(".mc-answer-confetti")).confetti=t.confetti||confetti.create(t,{resize:!0}),t.confetti({spread:150,origin:{y:1.3},particleCount:200,decay:.91,scalar:.8}),t.parentElement.querySelector(".indicator-symbol").style.color="var(--chakra-colors-green-500)",document.querySelector(".stack-width").children[getElementIndex(t.parentElement)+1].scrollIntoView({behavior:"auto",block:"center",inline:"center"}),document.querySelector(".stack-width").children[getElementIndex(t.parentElement)+1].className.includes("multiple-choice-wrapper")||setTimeout(function(){document.querySelector(".stack-width").classList.remove("blur-all-non-mc-questions")},100))}render(t){return this.state.explanation?(this.state.explanation.state.points=this.state.points,this.state.explanation.state.coins=this.state.coins,`<div>
	<div class="mc-answer-container mc-answer-container-embeded">
			${this.state.answers.map((t,e)=>{if(t)return`
					<button class="mc-answer-option ${this.parent.state.options[e].status}" onclick="{{_this}}.handleOptionClick(${e})">
						<span class="number">${e+1}</span>
						<span class="text">${codeTemplateToCode(t)}</span>
					</button>
				`}).join("")}
		</div>`+"<div>"+this.state.explanation.toString()+"</div></div>"):(this.setState("explanation",new ExplanationModal({points:this.state.points,coins:this.state.coins},this)),"<div></div>")}closeModal(){this.parent.setState("data.selectedAnswer",null)}}class MultipleChoiceWrapper extends tApp.Component{constructor(t,e){super(t,e),null==this.state.options&&(this.state.options=[],this.state.answers.forEach(t=>{this.state.options.push({status:"not_chosen"})})),this.state.alreadyCorrectAnswer=!1}render(t){var e=this.state;return`<div>
				${new EmbededMultipleChoice({answers:e.answers,correct:e.correct,descriptions:e.descriptions,points:e.points,coins:e.coins},this)}
			</div>`}}function getElementIndex(t){for(var e=0;t=t.previousElementSibling;)e++;return e}module.exports=MultipleChoiceWrapper;