// import request from 'common/api/request.js'
// import Player from 'common/game/player.js'

export const REQUEST_INVENTORY = 'REQUEST_INVENTORY'
export const RECIEVE_INVENTORY = 'RECIEVE_INVENTORY'

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
