import Inventory from './inventory.js'

export default class Player {

  constructor({inventory, equippedInventory, reassembleInventory}, key) {
    this.key = key
    this.inventory = inventory || new Inventory([], 120)
    this.equippedInventory = equippedInventory  || new Inventory([], 6)
    this.reassembleInventory = reassembleInventory || new Inventory([], 4)
  }

  static async fromJSON(jsonPlayer) {
    const inventory = await Inventory.fromJSON(jsonPlayer.inventory, 120) 
    const equippedInventory = await Inventory.fromJSON(jsonPlayer.equippedInventory, 6) 
 
    const reassembleInventory = await Inventory.fromJSON(jsonPlayer.reassembleInventory, 4)

    return new Player({ inventory, equippedInventory, reassembleInventory })
  }

  serialize() {
    return {
      inventory: this.inventory.serialize(),
      equippedInventory: this.equippedInventory.serialize(),
      reassembleInventory: this.reassembleInventory.serialize(),
    }
  }
}
