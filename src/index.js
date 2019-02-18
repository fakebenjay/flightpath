import React from 'react'
import ReactDOM from 'react-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import ConnectedApp from './App'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
)
