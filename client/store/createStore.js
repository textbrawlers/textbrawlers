import { createStore, applyMiddleware } from 'redux'
import { makeRootReducer } from 'client/reducers/index.js'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export default history => {
  return createStore(
    makeRootReducer(),
    composeWithDevTools(
      applyMiddleware(thunkMiddleware, routerMiddleware(history)),
    ),
  )
}
