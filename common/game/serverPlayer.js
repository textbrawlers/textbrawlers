import Monk from 'monk'
import Player from './player.js'

const db = new Monk(process.env.MONGODB || 'localhost/retardarenan')
const users = db.get('users')

export default class ServerPlayer extends Player{

  constructor(jsonPlayer, key) {
    super(jsonPlayer)

    this.key = key
  }
  
  static async fromKey(key) {
    console.log('from key key', key)
    const jsonUser = (await users.findOne({ key })) || {}

    if (jsonUser) {
      const player = new ServerPlayer.fromJSON(jsonUser.player || {}, key)
      player.key = key
      player.serverPlayer = true
      return player
    }
    return undefined
  }

  static async fromJSON(jsonPlayer, key) {
    return new ServerPlayer(await Player.baseFromJSON(jsonPlayer), key)
  }

  async save() {
    const key = this.key
    await users.update({key}, { $set: { player: this.serialize() }})
    console.log('saving player', this)
  }
}
