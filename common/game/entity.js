import Player from './player.js'
import NPC from './npc.js'

export default class Entity {
  static fromJSON (json) {
    if (json.type === Entity.TYPE_NPC) {
      return new NPC(json)
    } else {
      return new Player(Player.baseFromJSON(json))
    }
  }
}

Entity.TYPE_NPC = 'npc'
Entity.TYPE_PLAYER = 'player'
