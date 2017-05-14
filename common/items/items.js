import 'core-js/fn/object/entries'
import BaseItem from 'common/game/baseItem.js'
import StatCollection from 'common/game/statCollection.js'
import Stat from 'common/game/stat.js'

const cache = {}

async function parseNormalItems () {
  if (cache.normal) return cache.normal
  const allItems = []

  const itemsConfig = await System.import('common/json/items.json')
  const subItemConfigs = await Promise.all(itemsConfig.items.map(url => System.import(url)))

  subItemConfigs.forEach(config => {
    // each item file
    Object.entries(config).forEach(([category, items]) => {
      // each item category
      Object.entries(items).forEach(([id, item]) => {
        // each item
        const finalItem = new BaseItem(Object.assign({}, item, {category, id}))
        allItems.push(finalItem)
      })
    })
  })

  cache.normal = allItems

  return allItems
}

async function parseSetItems () {
  if (cache.set) return cache.set
  const allItems = []
  const setBonuses = {}

  const itemsConfig = await System.import('common/json/items.json')
  const setConfigs = await Promise.all(itemsConfig.sets.map(url => System.import(url)))

  setConfigs.forEach(config => {
    // each set item file
    Object.entries(config).forEach(([setName, setConfig]) => {
      // each set
      const set = {}
      setBonuses[setName] = set

      Object.entries(setConfig.items).forEach(([id, item]) => {
        // each set item
        const category = 'set'
        const itemSet = setName
        const finalItem = new BaseItem(Object.assign({}, item, {category, id, itemSet}))
        allItems.push(finalItem)
      })

      Object.entries(setConfig.bonuses).forEach(([itemsRequired, stats]) => {
        // each set bonus
        const statCollection = new StatCollection(Object.entries(stats).map(([id, value]) => new Stat(id, value)))

        set[itemsRequired] = statCollection
      })
    })
  })

  const resp = {
    items: allItems,
    setBonuses
  }

  cache.set = resp

  return resp
}

export default async function () {
  const normalItems = await parseNormalItems()
  const setItems = await parseSetItems()

  const items = normalItems.concat(setItems.items)
  const setBonuses = setItems.setBonuses

  return {items, setBonuses}
}
