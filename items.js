const itemFiles = [
  './items/hand/axe.json',
  './items/hand/hammer.json',
  './items/hand/shield.json',
  './items/hand/sword.json'
].map(file => require(file))

let allItems = {}

itemFiles.forEach(file => {
  Object.keys(file).forEach(type => {
    const items = file[type]

    Object.keys(items).forEach(key => {
      items[key].category = type
      items[key].type = key
    })

    allItems = Object.assign(allItems, items)
  })
})

module.exports = {allItems}
