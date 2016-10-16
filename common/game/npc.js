import StatCollection from './statCollection.js'
import EquippedInventory from './equippedInventory.js'
import Stat from './stat.js'
import Item from './item.js'

export default class NPC {

  constructor () {
    this.isNpc = true

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

  getStat (statId) {
    return this.stats.find(stat => stat.id === statId)
  }

  serialize () {
    return {}
  }

  fromJSON () {
    return new NPC()
  }
}
