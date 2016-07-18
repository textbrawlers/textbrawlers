const items = require('./items.js')
const prefixes = require('./items/weapon-prefixes.json')

const integerStats = [ 'health', 'damage' ]

const prefixCategories = Object.keys(prefixes)

const rarities = {
  common: {
    prefixes: 1,
    chance: 0.52

  },
  uncommon: {
    prefixes: 2,
    chance: 0.28
  },
  rare: {
    prefixes: 3,
    chance: 0.14
  },
  legendary: {
    prefixes: 4,
    chance: 0.06
  },
  set: {
    prefixes: 4,
    chance: 0.04
  }
}

function rangeInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function range (min, max) {
  return Math.random() * (max - min) + min
}

function randomizeRarity () {
  const rn = Math.random()
  if (rn < rarities.common.chance) {
    return 'common'
  } else if (rn < rarities.common.chance + rarities.uncommon.chance) {
    return 'uncommon'
  } else if (rn < rarities.common.chance + rarities.uncommon.chance + rarities.rare.chance) {
    return 'rare'
  } else {
    return 'legendary'
  }
}

function getPrefixes (rarity) {
  const nPrefixes = rarities[rarity].prefixes

  const selectedCategories = []

  while (selectedCategories.length < nPrefixes) {
    const suggestedPrefix = prefixCategories[Math.floor(Math.random() * prefixCategories.length)]

    if (selectedCategories.indexOf(suggestedPrefix) === -1) {
      selectedCategories.push(suggestedPrefix)
    }
  }

  return selectedCategories.map(category => {
    const possible = Object.keys(prefixes[category])
    return { category, prefix: possible[Math.floor(Math.random() * possible.length)]}
  })
}

function generateItem () {
  const keys = Object.keys(items)
  const key = keys[Math.floor(Math.random() * keys.length)]
  const item = items[key]

  const rarity = randomizeRarity()

  const prefixes = getPrefixes(rarity)

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
    item: key,
    rarity: rarity,
    prefixes: prefixes
  }

  return itemObj
}

generateItem()

module.exports = { generateItem}
