import Monk from 'monk'
import Player from './player.js'

const db = new Monk(process.env.MONGODB || 'localhost/retardarenan')
const users = db.get('users')

export default class ServerPlayer extends Player{
  
  static async fromKey(key) {
    const jsonUser = (await users.findOne({ key })) || {}

    if (jsonUser) {
      const player = new Player.fromJSON(jsonUser.player || {})
      player.key = key
      return player
    }
    return undefined
  }

  async save() {
    const key = this.key
    await users.update({key}, { $set: { player: this.serialize() }})
  }
}
