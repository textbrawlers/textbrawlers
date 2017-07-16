import { SET_NUMBER_GLOBAL_LOADING } from 'client/actions/global.js'

export const globalLoading = (state = 0, action) => {
  switch (action.type) {
    case SET_NUMBER_GLOBAL_LOADING:
      return state + action.change
    default:
      return state
  }
}
