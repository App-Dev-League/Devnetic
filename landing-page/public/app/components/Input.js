class Input extends tApp.Component{constructor(t,s){super(t,s),null==this.state.value&&(this.state.value=""),null==this.state.classList&&(this.state.classList=[]),null==this.state.properties&&(this.state.properties={}),null==this.state.type&&(this.state.type="text"),null==this.state.onChange&&(this.state.onChange=function(){}),null==this.state.update&&(this.state.update=()=>{})}render(t){return`<input 
			class="${this.state.classList.join(" ")}" 
			type="${this.state.type}" 
			value="${tApp.escape(this.state.value)}"
			oninput="{{_this}}.setState('value', this.value); {{_this}}.state.onChange()"
			${Object.keys(this.state.properties).map(t=>`${t}="${this.state.properties[t]}"`).join(" ")}
		/>`}}module.exports=Input;