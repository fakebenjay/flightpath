import React from 'react'
import ReactDOM from 'react-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import ConnectedApp from './App'
import { Router } from 'react-router';
import createHashHistory from 'history/createHashHistory'

const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL })

ReactDOM.render(
	<Provider store = { store }>
	<ConnectedApp />
	</Provider>,
	document.getElementById('root') at HTMLElement
)
