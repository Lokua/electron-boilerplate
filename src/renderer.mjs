import React from 'react'
import ReactDOM from 'react-dom'

global.h = React.createElement

ReactDOM.render(
  h('h1', null, 'Hello, World'),
  document.getElementById('root')
)