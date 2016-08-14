import Monk from 'monk'
import Player from './player.js'

const db = new Monk(process.env.MONGODB || 'localhost/retardarenan')
const users = db.get('users')

export default class ServerPlayer extends Player {

  constructor (jsonPlayer, key) {
    super(jsonPlayer)

    this.key = key
  }

  static async fromKey (key, both = false) {
    const jsonUser = (await users.findOne({key}))

    if (jsonUser) {
      const player = await ServerPlayer.fromJSON(jsonUser.player || {}, key)
      player.key = key
      player.id = jsonUser._id
      player.serverPlayer = true
      if (both) {
        return { player, jsonUser }
      } else {
        return player
      }
    }
    return undefined
  }

  static async fromJSON (jsonPlayer, key) {
    return new ServerPlayer(await Player.baseFromJSON(jsonPlayer), key)
  }

  async save () {
    const key = this.key
    await users.update({key}, { $set: { player: this.serialize() } })
  }
}
