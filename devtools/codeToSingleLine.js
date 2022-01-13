var code = `
class Component1 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        this.props.onChangeParent("newStateValue")
        return;
    }
}
`

if (code.startsWith("\n")) code = code.slice(1)
if (code.endsWith("\n")) code = code.slice(0, -1)
code = code.replace(/\n/g, "\\n")
code = code.replace(/\"/g, '\\"')
console.log(code)