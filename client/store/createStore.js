import { createStore, applyMiddleware } from 'redux'
import { makeRootReducer } from './reducers.js'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'

export default history => {
  const store = createStore(
    makeRootReducer(),
    applyMiddleware(thunkMiddleware, createLogger(), routerMiddleware(history))
  )

  return store
}

