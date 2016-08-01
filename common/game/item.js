import 'core-js/fn/object/entries'
import Stat from './stat.js'

export default class Item {
  constructor(baseItem, { prefixes = [], rarity } = {}) {
    this.baseItem = baseItem

    this.prefixes = prefixes

    const prefixList = prefixes.map(prefix => prefix.name).join(' ')

    this.displayName = `${prefixList} ${this.baseItem.name}`

    this.baseCharacterStats = Object.entries(this.baseItem.characterStats).map(([id, value]) => new Stat(id, value))
    this.baseAttackStats = Object.entries(this.baseItem.attackStats).map(([id, value]) => new Stat(id, value))
    
    this.baseEmpoweredStats = this.baseItem.empoweredStats.map(empowerConfig => {
      return {
        stats: Object.entries(empowerConfig.stats).map(([id, value]) => new Stat(id, value)),
        category: empowerConfig.category
      }
    })

    this.characterStats = this.mergeStats(this.baseCharacterStats.concat(...this.prefixes.map(prefix => prefix.characterStats)))
    this.attackStats = this.mergeStats(this.baseAttackStats.concat(...this.prefixes.map(prefix => prefix.attackStats)))

    this.empoweredStats = []
    this.baseEmpoweredStats.concat(...this.prefixes.map(prefix => prefix.empoweredStats)).forEach(empowered => {
      if (empowered) {
        const exisitingEmpower = this.empoweredStats.find(emp => emp.category === empowered.category)

        if (exisitingEmpower) {
          exisitingEmpower.stats = this.mergeStats(exisitingEmpower.concat(empowered.stats))
        } else {
          this.empoweredStats.push(empowered)
        }
      }
    })


    this.rarity = rarity || 'common'

    this.category = baseItem.category
    this.description = baseItem.description
  }

  mergeStats(stats) {
    const outStats = []
    stats.forEach(stat => {
      const existingStat = outStats.find(s => s.id === stat.id)
      if (existingStat) {
        existingStat.add(stat.value)
      } else {
        outStats.push(stat)
      }
    })

    return outStats
  }

  get image() {
    return `/client/png/${this.baseItem.icon}.png`
  }
}
