
export default class RealtimePlayer {
  constructor (player, ws) {
    this.player = player
    this.ws = ws
  }

  send (id, data) {
    this.ws.send(JSON.stringify({id, data}))
  }

  updatePlayerCount (count) {
    this.send('status.playercount', count)
  }
}
