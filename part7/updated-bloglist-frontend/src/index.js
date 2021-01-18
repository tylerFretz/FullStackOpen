import React from 'react'
import ReactDOM from 'react-dom'
import store from './store/store'
import App from './App'
import './App.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'))