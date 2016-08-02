import Inventory from './inventory.js'

export default class ServerPlayer {

  constructor(jsonPlayer) {
  }

  static async fromJSON() {
    const inventory = await Inventory.fromJSON(jsonPlayer.inventory) 
    const equippedInventory = await Inventory.fromJSON(jsonPlayer.equippedInventory) 
 
    const reassembleInventory = await Inventory.fromJSON(jsonPlayer.reassembleInventory)
  }

  serialize() {
    return {
      /*inventory: this.inventory.serialize()*/
    }
  }
}
