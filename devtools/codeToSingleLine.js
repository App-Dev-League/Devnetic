var code = `
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        // binding the event handlers
        this.myFunction = this.myFunction.bind(this)
    }
    myFunction(e, parameter1) {
        // preventing default actions
        e.preventDefault();
        console.log("Parameter 1: " + parameter1)
    }
    render() {
        // defining event handler function
        return (
            <button onClick={(e) => this.myFunction(e, "hello!")}>myFunction with parameters</button>
        )
    }
}
`

if (code.startsWith("\n")) code = code.slice(1)
if (code.endsWith("\n")) code = code.slice(0, -1)
code = code.replace(/\n/g, "\\n")
code = code.replace(/\"/g, '\\"')
console.log(code)