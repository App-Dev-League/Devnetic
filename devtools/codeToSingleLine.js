var code = `
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Header from './components/header/header'
import InfoDisplayer from './components/infoDisplayer/infoDisplayer';

ReactDOM.render(
  <div>
      <Header/>
      <InfoDisplayer name="Bob" age="15" color="Blue" book="Lord of the Rings"/>
  </div>,
  document.getElementById('root')
)
`

if (code.startsWith("\n")) code = code.slice(1)
if (code.endsWith("\n")) code = code.slice(0, -1)
code = code.replace(/\n/g, "\\n")
code = code.replace(/\"/g, '\\"')
console.log(code)