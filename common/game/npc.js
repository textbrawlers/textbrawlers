import StatCollection from './statCollection.js'
import EquippedInventory from './equippedInventory.js'
import Stat from './stat.js'
import Item from './item.js'
import Entity from './entity.js'

export default class NPC {

  constructor (npcData) {
    this.type = Entity.TYPE_NPC

    let cStats = []
    Object.entries(npcData).forEach(([key, value]) => {
      if (key !== 'name' && key !== 'equipped') {
        cStats.push(new Stat(key, value))
      } else if (key === 'name') {
        this.name = value
      }
    })
    this.stats = new StatCollection(cStats)

    let aStats = []
    Object.entries(npcData.equipped.left.stats).forEach(([key, value]) => {
      if (key !== 'name') {
        aStats.push(new Stat(key, value))
      }
    })

    this.weaponStats = [{
      stats: new StatCollection(aStats),
      weapon: Item.fromJSON({
        id: npcData.equipped.left.id,
        rarity: 'legendary',
        prefixes: [[]]
      })
    }]

    this.equipped = new EquippedInventory([], 7)
  }

  // generate argument to be passed into the constructor
  static baseFromJSON () {
    return {}
  }

  getStat (statId) {
    return this.stats.find(stat => stat.id === statId)
  }

  serialize () {
    return {
      type: this.type,
      name: this.name
    }
  }
}
