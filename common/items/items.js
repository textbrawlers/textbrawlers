import 'core-js/fn/object/entries'

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
        const finalItem = Object.assign({}, item, { category, id })
        allItems.push(finalItem)
      })
    })
  })
  
  return allItems
}

