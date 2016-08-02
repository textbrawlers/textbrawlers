import Inventory from './inventory.js'

export default class ServerPlayer {

  constructor({inventory, equippedInventory, reassembleInventory}) {
    this.inventory = inventory || new Inventory([], 120)
    this.equippedInventory = equippedInventory  || new Inventory([], 120)
    this.reassembleInventory = reassembleInventory || new Inventory([], 4)
  }

  static async fromJSON() {
    const inventory = await Inventory.fromJSON(jsonPlayer.inventory, 120) 
    const equippedInventory = await Inventory.fromJSON(jsonPlayer.equippedInventory, 6) 
 
    const reassembleInventory = await Inventory.fromJSON(jsonPlayer.reassembleInventory, 4)
  }

  serialize() {
    return {
      inventory: this.inventory.serialize(),
      equippedInventory: this.equippedInventory.serialize(),
      reassembleInventory: this.reassembleInventory.serialize(),
    }
  }
}
