import StatCollection from './statCollection.js'
import EquippedInventory from './equippedInventory.js'
import Item from './item.js'
import Entity from './entity.js'

export default class NPC {

  constructor ({weaponStats, stats, name, difficulty}) {
    this.type = Entity.TYPE_NPC

    this.weaponStats = weaponStats
    this.stats = stats
    this.name = name
    this.difficulty = difficulty

    this.equipped = new EquippedInventory([], 7)
  }

  // generate argument to be passed into the constructor
  static baseFromJSON (npcData) {
    return {
      weaponStats: npcData.weaponStats.map(({stats, weapon}) => ({
        stats: StatCollection.fromJSON(stats),
        weapon: Item.fromJSON(weapon)
      })),
      stats: StatCollection.fromJSON(npcData.stats),
      difficulty: npcData.difficulty,
      name: npcData.name
    }
  }

  getStat (statId) {
    return this.stats.find(stat => stat.id === statId)
  }

  serialize () {
    return {
      type: this.type,
      name: this.name,
      difficulty: this.difficulty,
      stats: this.stats.serialize(),
      weaponStats: this.weaponStats.map(({stats, weapon}) => ({
        stats: stats.serialize(),
        weapon: weapon.serialize()
      }))
    }
  }
}
