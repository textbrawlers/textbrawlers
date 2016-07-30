import 'core-js/fn/object/entries'
import Stat from './stat.js'

export default class Item {
  constructor(baseItem, { prefixes = [], rarity } = {}) {
    this.baseItem = baseItem

    this.prefixes = prefixes

    this.displayName = `[prefixes] ${this.baseItem.name}`

    this.characterStats = Object.entries(this.baseItem.characterStats).map(([id, value]) => new Stat(id, value))
    this.attackStats = Object.entries(this.baseItem.attackStats).map(([id, value]) => new Stat(id, value))

    this.rarity = rarity || 'common'
  }

  get image() {
    return `/client/png/${this.baseItem.icon}.png`
  }
}
