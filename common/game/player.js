import Inventory from './inventory.js'

export default class Player {

  constructor({inventory, equippedInventory, reassembleInventory}) {
    this.inventory = inventory || new Inventory([], 120)
    this.equippedInventory = equippedInventory  || new Inventory([], 6)
    this.reassembleInventory = reassembleInventory || new Inventory([], 4)
  }

  static async baseFromJSON(jsonPlayer) {
    const inventory = await Inventory.fromJSON(jsonPlayer.inventory, 120) 
    const equippedInventory = await Inventory.fromJSON(jsonPlayer.equippedInventory, 6) 
 
    const reassembleInventory = await Inventory.fromJSON(jsonPlayer.reassembleInventory, 4)

    return { inventory, equippedInventory, reassembleInventory }
  }

  static async fromJSON(jsonPlayer) {
    return new Player(await Player.baseFromJSON(jsonPlayer))
  }

  serialize() {
    return {
      inventory: this.inventory.serialize(),
      equippedInventory: this.equippedInventory.serialize(),
      reassembleInventory: this.reassembleInventory.serialize(),
    }
  }
}
