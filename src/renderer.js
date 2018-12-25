import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {
  getGreeting = () => 'Hello, world!'

  render() {
    return <div>{this.getGreeting()}</div>
  }
}

render(
  <div>Hello, world!</div>,
  document.getElementById('root')
)