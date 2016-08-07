import 'core-js/fn/object/entries'
import Stat from './stat.js'
import Prefix from './prefix.js'
import getItems from 'common/items/items.js'
import StatCollection from './statCollection.js'
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

    this.baseCharacterStats = new StatCollection(Object.entries(baseItem.characterStats).map(([id, value]) => new Stat(id, value)))
    this.baseAttackStats = new StatCollection(Object.entries(baseItem.attackStats).map(([id, value]) => new Stat(id, value)))
    
    this.baseEmpoweredStats = baseItem.empoweredStats.map(empowerConfig => {
      return {
        stats: new StatCollection(Object.entries(empowerConfig.stats).map(([id, value]) => new Stat(id, value))),
        category: empowerConfig.category
      }
    })

    this.characterStats = new StatCollection(this.baseCharacterStats)
    this.attackStats = new StatCollection(this.baseAttackStats)
    this.empoweredStats = []

    this.baseEmpoweredStats.forEach(({stats, category}) => this.empoweredStats.push({stats, category}))

    this.prefixes.forEach(prefix => {
      this.characterStats.add(prefix.characterStats)
      this.attackStats.add(prefix.attackStats)

      prefix.empoweredStats.forEach(empowered => {
        const existingEmpower = this.empoweredStats.find(emp => emp.category === empowered.category)

        if (existingEmpower) {
          console.log('exisiting', existingEmpower)
          if (!existingEmpower.stats) {
            debugger
          }
          existingEmpower.stats = existingEmpower.stats.add(empowered.stats)
        } else {
          this.empoweredStats.push({stats: empowered.stats, category: empowered.category})
        }
      })
    })

    this.icon = baseItem.icon
    this.rarity = rarity || 'common'
    this.category = baseItem.category
    this.description = baseItem.description
    this.id = baseItem.id
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
