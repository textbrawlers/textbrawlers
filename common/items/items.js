import 'core-js/fn/object/entries'
import BaseItem from 'common/game/baseItem.js'

export default async function items() {
  const allItems = []

  const itemsConfig = await System.import('common/json/items.json')
  const subItemConfigs = await Promise.all(itemsConfig.files.map(url => System.import(url)))

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

