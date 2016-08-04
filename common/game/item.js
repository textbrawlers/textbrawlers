import 'core-js/fn/object/entries'
import Stat from './stat.js'
import Prefix from './prefix.js'
import getItems from 'common/items/items.js'
import getPrefixes from 'common/items/prefixes.js'
import LRU from 'lru-cache'

const itemCache = LRU({
  max: 10000
})

export default class Item {
  constructor(baseItem, { prefixes = [], rarity } = {}) {
    this.prefixes = prefixes

    const prefixList = prefixes.map(prefix => prefix.name).join(' ')

    this.displayName = `${prefixList} ${baseItem.name}`

    this.baseCharacterStats = Object.entries(baseItem.characterStats).map(([id, value]) => new Stat(id, value))
    this.baseAttackStats = Object.entries(baseItem.attackStats).map(([id, value]) => new Stat(id, value))
    
    this.baseEmpoweredStats = baseItem.empoweredStats.map(empowerConfig => {
      return {
        stats: Object.entries(empowerConfig.stats).map(([id, value]) => new Stat(id, value)),
        category: empowerConfig.category
      }
    })

    this.characterStats = this.mergeStats(this.baseCharacterStats.concat(...this.prefixes.map(prefix => prefix.characterStats)))
    this.attackStats = this.mergeStats(this.baseAttackStats.concat(...this.prefixes.map(prefix => prefix.attackStats)))

    this.empoweredStats = []
    this.baseEmpoweredStats.concat(...this.prefixes.map(prefix => prefix.empoweredStats)).forEach(empowered => {
      const exisitingEmpower = this.empoweredStats.find(emp => emp.category === empowered.category)

      if (exisitingEmpower) {
        exisitingEmpower.stats = this.mergeStats(exisitingEmpower.stats.concat(empowered.stats))
      } else {
        this.empoweredStats.push(empowered)
      }
    })

    this.icon = baseItem.icon


    this.rarity = rarity || 'common'

    this.category = baseItem.category
    this.description = baseItem.description
    this.id = baseItem.id
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
    return `/client/png/${this.icon}.png`
  }

  static async fromJSON(jsonItem) {
    const str = JSON.stringify(jsonItem)

    const cachedItem = itemCache.get(str)

    if (cachedItem) {
      return cachedItem
    }

    const { items } = await getItems()
    const { prefixes } = await getPrefixes()


    const baseItem = items.find(item => item.id === jsonItem.id)

    if (!baseItem) {
      console.warn(`Tried to create item of type ${jsonItem.id}`)
      return
    }

    const item = new Item(baseItem, {
      rarity: jsonItem.rarity,
      prefixes: (jsonItem.prefixes || []).map(prefix => new Prefix(prefix, prefixes[prefix[0]][prefix[1]][prefix[2]]))
    })

    itemCache.set(str, item)


    return item
  }

  serialize() {
    return {
      id: this.id,
      rarity: this.rarity,
      prefixes: this.prefixes.map(prefix => prefix.path)
    }
  }
}
