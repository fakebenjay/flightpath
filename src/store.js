import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { history } from './index.js'

const rMiddleware = routerMiddleware(history)

export function configureStore(){
  return createStore(rootReducer, compose(applyMiddleware(thunk, rMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f))
}

export const store = configureStore()
