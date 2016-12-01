import { createStore, applyMiddleware } from 'redux'
import { makeRootReducer } from './reducers.js'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

export default () => {
  const store = createStore(
    makeRootReducer(),
    applyMiddleware(
      thunkMiddleware,
      createLogger()
    )
  )

  return store
}
