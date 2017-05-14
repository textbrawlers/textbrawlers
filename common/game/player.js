import Inventory from './inventory.js'
import EquippedInventory from './equippedInventory.js'
import StatCollection from './statCollection.js'
import Stat from './stat.js'

export default class Player {

  constructor ({inventory, equipped, reassemble, id}) {
    this.inventory = inventory || new Inventory([], 120)
    this.equipped = equipped || new EquippedInventory([], 7)
    this.reassemble = reassemble || new Inventory([], 4)
    this.id = id
  }

  static baseFromJSON (jsonPlayer) {
    const inventory = Inventory.fromJSON(Inventory, jsonPlayer.inventory, 120)
    const equipped = EquippedInventory.fromJSON(EquippedInventory, jsonPlayer.equipped, 7)
    const reassemble = Inventory.fromJSON(Inventory, jsonPlayer.reassemble, 4)

    const id = jsonPlayer.id

    return {inventory, equipped, reassemble, id}
  }

  getInventory (inv) {
    if (inv === 'inventory') {
      return this.inventory
    }
    if (inv === 'equipped') {
      return this.equipped
    }
    if (inv === 'reassemble') {
      return this.reassemble
    }
  }

  get stats () {
    let characterStats = new StatCollection()
    characterStats.add(new Stat('max-health', 100))
    characterStats.add(new Stat('block-multiplier', 0.75))
    characterStats.add(new Stat('dodge-chance', 0.1))
    for (let i = 0; i < 7; i++) {
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
      'block-multiplier',
      'dodge-chance',
      'comfort',
      'fashionable',
      'luck',
      'timestop'
    ]

    stats.filter(stat => statsToRemove.indexOf(stat.id) === -1)
    return stats
  }

  getStat (statId) {
    return this.stats.find(stat => stat.id === statId)
  }

  get weaponStats () {
    const weapons = []
    for (let i = 0; i < 7; i++) {
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

  static fromJSON (jsonPlayer) {
    return new Player(Player.baseFromJSON(jsonPlayer))
  }

  serialize () {
    return {
      inventory: this.inventory.serialize(),
      equipped: this.equipped.serialize(),
      reassemble: this.reassemble.serialize(),
      id: this.id
    }
  }
}
