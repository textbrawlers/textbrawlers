import 'core-js/fn/object/entries'
import Stat from './stat.js'

export default class Item {
  constructor(baseItem, { prefixes = [], rarity } = {}) {
    this.baseItem = baseItem

    this.prefixes = prefixes

    const prefixList = prefixes.map(prefix => prefix.name).join(' ')

    this.displayName = `${prefixList} ${this.baseItem.name}`

    this.characterStats = Object.entries(this.baseItem.characterStats).map(([id, value]) => new Stat(id, value))
    this.attackStats = Object.entries(this.baseItem.attackStats).map(([id, value]) => new Stat(id, value))
    
    this.empoweredStats = this.baseItem.empoweredStats.map(empowerConfig => {
      return {
        stats: Object.entries(empowerConfig.stats).map(([id, value]) => new Stat(id, value)),
        category: empowerConfig.category
      }
    })

    this.rarity = rarity || 'common'

    this.category = baseItem.category
    this.description = baseItem.description
  }

  get image() {
    return `/client/png/${this.baseItem.icon}.png`
  }
}
