import { SET_USER } from 'client/actions/auth.js'

export const user = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}
