const itemFiles = [
  './items/equipable/hand/axe.json',
  './items/equipable/hand/hammer.json',
  './items/equipable/hand/shield.json',
  './items/equipable/hand/sword.json',
  './items/equipable/hand/knife.json',
  './items/equipable/armor/head.json',
  './items/equipable/armor/torso.json',
  './items/equipable/armor/legs.json',
  './items/equipable/armor/feet.json'
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
