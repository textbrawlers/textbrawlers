import 'core-js/fn/object/entries'
import BaseItem from 'common/game/baseItem.js'

async function parseNormalItems() {
  const allItems = []

  const itemsConfig = await System.import('common/json/items.json')
  const subItemConfigs = await Promise.all(itemsConfig.items.map(url => System.import(url)))

  subItemConfigs.forEach(config => {
    // each item file
    Object.entries(config).forEach(([category, items]) => {
      // each item category
      Object.entries(items).forEach(([id, item]) => {
        // each item
        const finalItem = new BaseItem(Object.assign({}, item, { category, id }))
        allItems.push(finalItem)
      })
    })
  })

  return allItems
}

async function parseSetItems() {
  const allItems = []
  const setBonuses = {}

  const itemsConfig = await System.import('common/json/items.json')
  const setConfigs = await Promise.all(itemsConfig.sets.map(url => System.import(url)))

  setConfigs.forEach(config => {
    // each set item file
    Object.entries(config).forEach(([setName, setConfig]) => {
      // each set
      Object.entries(setConfig.items).forEach(([id, item]) => {
        // each set item
        const category = 'set'
        const finalItem = new BaseItem(Object.assign({}, item, { category, id }))
        allItems.push(finalItem)
      })
    })
  })
  return {
    items: allItems,
    setBonuses
  }
}

export default async function() {
  const normalItems = await parseNormalItems()
  const setItems = await parseSetItems()

  const items = normalItems.concat(setItems.items)
  const setBonuses = setItems.bonuses


  return { items, setBonuses }
}
