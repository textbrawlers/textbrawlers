export default class Item {
  constructor(baseItem, { prefixes = [], rarity } = {}) {
    this.baseItem = baseItem

    this.prefixes = prefixes

    this.displayName = `[prefixes] ${this.baseItem.name}`

    this.characterStats = this.baseItem.characterStats
    this.attackStats = this.baseItem.attackStats

    this.rarity = rarity || 'common'
  }

  get image() {
    return `/client/png/${this.baseItem.icon}.png`
  }
}
