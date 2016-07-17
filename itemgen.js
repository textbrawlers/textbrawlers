const items = require('./items.js')

const integerStats = [ 'health', 'damage' ]

function rangeInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function range(min, max) {
  return Math.random() * (max - min) + min
}

function generateItem () {
  const keys = Object.keys(items)
  const key = keys[Math.floor(Math.random() * keys.length)]
  const item = items[key]

  const stats = item.stats || {}

  const rolls = {}

  Object.keys(stats).forEach(key => {
    const statsRange = stats[key]

    let rangeFn = (a, b) => Math.floor(range(a, b) * 100) / 100

    if (integerStats.indexOf(key) !== -1) {
      rangeFn = rangeInt
    }

    rolls[key] = rangeFn(statsRange[0], statsRange[1])
  })

  const itemObj = {
    rolls,
    item: key
  }

  return itemObj
}

generateItem()

module.exports = { generateItem }
