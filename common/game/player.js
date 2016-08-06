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

  get stats() {
    let characterStats = []
    for (let i = 0; i < 6; i++) {
      const item = this.equipped.get(i)
      if (!item) {
        continue
      }

      characterStats = this.mergeStats(characterStats.concat(item.characterStats))
    }

    return characterStats
  }

  mergeStats(stats) {
    const outStats = []
    stats.forEach(stat => {
      const existingStat = outStats.find(s => s.id === stat.id)
      const index = outStats.indexOf(existingStat)
      if (existingStat) {
        outStats[index] = existingStat.add(stat.value)
      } else {
        outStats.push(stat)
      }
    })

    return outStats
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
