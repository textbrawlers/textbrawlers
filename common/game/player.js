import Inventory from './inventory.js'

export default class Player {

  constructor({inventory, equipped, reassemble}) {
    this.inventory = inventory || new Inventory([], 120)
    this.equipped = equipped || new Inventory([], 6)
    this.reassemble = reassemble || new Inventory([], 4)
  }

  static async baseFromJSON(jsonPlayer) {
    const inventory = await Inventory.fromJSON(jsonPlayer.inventory, 120)
    const equipped = await Inventory.fromJSON(jsonPlayer.equipped, 6)

    const reassemble = await Inventory.fromJSON(jsonPlayer.reassemble, 4)

    return { inventory, equipped, reassemble }
  }

  static async fromJSON(jsonPlayer) {
    return new Player(await Player.baseFromJSON(jsonPlayer))
  }

  serialize() {
    return {
      inventory: this.inventory.serialize(),
      equipped: this.equipped.serialize(),
      reassemble: this.reassemble.serialize(),
    }
  }
}
