export default class BaseItem {
  constructor(jsonItem) {
    this.jsonItem = jsonItem

    this.name = jsonItem.name
    this.slot = jsonItem.slot
    this.attack = jsonItem.attack
    this.icon = jsonItem.icon
    this.dropRate = jsonItem['drop-rate']
    this.characterStats = jsonItem['character-stats'] || {}
    this.attackStats = jsonItem['attack-stats'] || {}
    this.id = jsonItem.id
    this.category = jsonItem.category
    this.dropRate = jsonItem['drop-rate']
  }
}
