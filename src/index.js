import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  // Wrap BrowerRouter around App to utilize react-router-dom
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'))
