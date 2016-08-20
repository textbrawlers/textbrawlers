import Inventory from './inventory.js'
import StatCollection from './statCollection.js'
import Stat from './stat.js'

export default class Player {

  constructor ({inventory, equipped, reassemble, id}) {
    this.inventory = inventory || new Inventory([], 120)
    this.equipped = equipped || new Inventory([], 6)
    this.reassemble = reassemble || new Inventory([], 4)
    this.id = id
  }

  static async baseFromJSON (jsonPlayer) {
    const inventory = await Inventory.fromJSON(jsonPlayer.inventory, 120)
    const equipped = await Inventory.fromJSON(jsonPlayer.equipped, 6)

    const reassemble = await Inventory.fromJSON(jsonPlayer.reassemble, 4)

    return {inventory, equipped, reassemble}
  }

  get stats () {
    let characterStats = new StatCollection()
    characterStats.add(new Stat('max-health', 100))
    characterStats.add(new Stat('block-multiplier', 0.75))
    for (let i = 0; i < 6; i++) {
      const item = this.equipped.get(i)
      if (!item) {
        continue
      }

      characterStats.add(item.characterStats)
    }

    const maxHpMultiplier = characterStats.find(stat => stat.id === 'max-health-multiplier')
    if (maxHpMultiplier) {
      const maxHpFlat = characterStats.stats.find(stat => stat.id === 'max-health')
      characterStats.remove(maxHpMultiplier)

      characterStats.add(new Stat('max-health', maxHpMultiplier.value * maxHpFlat.value))
    }

    return characterStats
  }

  getWeaponStats (weapon) {
    const stats = new StatCollection(this.stats)
    stats.add(weapon.attackStats)

    for (let i = 0; i < 6; i++) {
      const item = this.equipped.get(i)
      if (!item) { continue }
      item.empoweredStats.filter(empower => empower.category === weapon.category).forEach(empower => {
        stats.add(empower.stats)
      })
    }

    const statsToRemove = [
      'max-health',
      'block-chance',
      'block-multiplier'
    ]

    stats.filter(stat => statsToRemove.indexOf(stat.id) === -1)
    return stats
  }

  getStat (statId) {
    return this.stats.find(stat => stat.id === statId)
  }

  get weaponStats () {
    const weapons = []
    for (let i = 0; i < 6; i++) {
      const item = this.equipped.get(i)
      if (!item || !item.canAttack) {
        continue
      }

      weapons.push({
        stats: this.getWeaponStats(item),
        weapon: item,
        slot: i
      })
    }

    return weapons
  }

  static async fromJSON (jsonPlayer) {
    return new Player(await Player.baseFromJSON(jsonPlayer))
  }

  serialize () {
    return {
      inventory: this.inventory.serialize(),
      equipped: this.equipped.serialize(),
      reassemble: this.reassemble.serialize()
    }
  }
}
