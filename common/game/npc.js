import StatCollection from './statCollection.js'
import EquippedInventory from './equippedInventory.js'
import Stat from './stat.js'
import Item from './item.js'
import Entity from './entity.js'

export default class NPC {

  constructor () {
    this.type = Entity.TYPE_NPC

    this.stats = new StatCollection([
      new Stat('max-health', 100),
      new Stat('block-multiplier', 0.75)
    ])

    this.weaponStats = [{
      stats: new StatCollection([
        new Stat('damage', 10)
      ]),
      weapon: Item.fromJSON({
        id: 'longsword',
        rarity: 'legendary',
        prefixes: [
          ['sword-prefixes', 'cirt-chance', 'uncertain']
        ]
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
      type: this.type
    }
  }
}
