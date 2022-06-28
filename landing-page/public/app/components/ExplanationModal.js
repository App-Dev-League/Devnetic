class ExplanationModal extends tApp.Component{constructor(t,e){super(t,e),null==this.state.title&&(this.state.title=""),null==this.state.description&&(this.state.description=""),null==this.state.retry&&(this.state.retry=!0)}render(t){return`<div>
	{% if(state.title == "") %}
		<div class="explanation-wrapper explanation-wrapper-inactive">
			<div class="explanation-modal explanation-modal-inactive">
			</div>
		</div>
	{% else %}
		<div class="explanation-wrapper">
			<div class="explanation-modal">
				<center>
					<h3>${tApp.escape(this.state.title)}</h3>
					<p>${tApp.escape(this.state.description)}</p>
					{% if(state.retry) %}
						<button class="button-incorrect" onclick="{{_this}}.parent.closeModal();">Try Again</button>
					{% else %}
						{% if((state.points != null && state.points > 0) || (state.coins != null && state.coins > 0)) %}
							<p>
							{% if(state.points != null && state.points > 0) %}
							+{{ state.points }} XP
							{% endif %}

							{% if((state.points != null && state.points > 0) && (state.coins != null && state.coins > 0)) %}
							<br>
							{% endif %}

							{% if(state.coins != null && state.coins > 0) %}
							+{{ state.coins }} coins
							{% endif %}
							</p>
						{% endif %}
						<button class="button-correct" onclick="{{_this}}.parent.parent.next();">Next</button>
					{% endif %}
				</center>
			</div>
		</div>
	{% endif %}
</div>`}}module.exports=ExplanationModal;