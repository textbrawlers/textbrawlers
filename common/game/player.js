import Inventory from './inventory.js'

export default class ServerPlayer {

  constructor(jsonPlayer) {
    this.inventory = new Inventoryjson(jsonPlayer.inventory) 
  }

  serialize() {
    return this.jsonPlayer
  }

  
}
