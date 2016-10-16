import db from 'server/common/database.js'
import Player from './player.js'
const users = db.get('users')

export default class ServerPlayer extends Player {

  constructor (jsonPlayer, key) {
    super(jsonPlayer)

    this.key = key
  }

  static async fromKey (key, both = false) {
    const jsonUser = (await users.findOne({key}))

    if (jsonUser) {
      const player = ServerPlayer.fromJSON(jsonUser.player || {}, key)
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

  static async fromId (id) {
    const jsonUser = await users.findOne(id)

    if (jsonUser) {
      const player = ServerPlayer.fromJSON(jsonUser.player || {})
      player.id = jsonUser._id
      player.ServerPlayer = true

      return player
    }
  }

  static fromJSON (jsonPlayer, key) {
    return new ServerPlayer(Player.baseFromJSON(jsonPlayer), key)
  }

  async save () {
    const key = this.key
    await users.update({key}, { $set: { player: this.serialize() } })
  }
}
