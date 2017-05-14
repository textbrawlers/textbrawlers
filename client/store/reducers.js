import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { REQUEST_INVENTORY, RECIEVE_INVENTORY, SET_USER } from './actions.js'

const inventory = (
  state = {
    isFetching: false,
    inventory: null
  },
  action
) => {
  switch (action.type) {
    case REQUEST_INVENTORY:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECIEVE_INVENTORY:
      return Object.assign({}, state, {
        isFetching: false,
        inventory: action.inventory
      })
    default:
      return state
  }
}

const inventoriesById = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_INVENTORY:
    case RECIEVE_INVENTORY:
      return Object.assign({}, state, {
        [action.playerId]: inventory(state[action.playerId], action)
      })
    default:
      return state
  }
}

const user = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}

export const makeRootReducer = () => {
  return combineReducers({
    inventoriesById,
    user,
    router: routerReducer
  })
}

