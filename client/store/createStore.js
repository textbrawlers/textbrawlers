import { createStore, applyMiddleware } from 'redux'
import { makeRootReducer } from './reducers.js'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export default history => {
  const store = createStore(
    makeRootReducer(),
    composeWithDevTools(
      applyMiddleware(thunkMiddleware, routerMiddleware(history))
    )
  )

  return store
}

