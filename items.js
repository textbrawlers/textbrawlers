const itemsets = require('./items/itemsets.json')

let items = {}

itemsets.forEach(set => {
  const setConfig = require(`./items/${set}.json`)

  items = Object.assign(items, setConfig)
})

module.exports = items
