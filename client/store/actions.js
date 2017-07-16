// import request from 'common/api/request.js'
// import Player from 'common/game/player.js'

export const REQUEST_INVENTORY = 'REQUEST_INVENTORY'
export const RECIEVE_INVENTORY = 'RECIEVE_INVENTORY'
export const SET_USER = 'SET_USER'
export const SET_NUMBER_GLOBAL_LOADING = 'SET_NUMBER_GLOBAL_LOADING'

export const requestInventory = playerId => ({
  type: REQUEST_INVENTORY,
  playerId,
})

export const recieveInventory = (playerId, json) => ({
  type: RECIEVE_INVENTORY,
  playerId,
  inventory: Player.fromJSON(json),
})

export const fetchInventory = playerId => {
  return dispatch => {
    dispatch(requestInventory(playerId))

    return request.get('/api/user/get').then(resp => {
      dispatch(recieveInventory(playerId, resp.json))
    })
  }
}

export const startGlobalLoading = () => ({
  type: SET_NUMBER_GLOBAL_LOADING,
  change: 1,
})

export const stopGlobalLoading = () => ({
  type: SET_NUMBER_GLOBAL_LOADING,
  change: -1,
})

export const setUser = user => ({
  type: SET_USER,
  user,
})
