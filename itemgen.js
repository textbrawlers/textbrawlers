const items = require('./items.js').allItems
const prefixes = require('./prefixes.js')
const prefixTypes = require('./items/prefixes/prefix-type.json')

const weightedPrefixTypes = {}

Object.keys(prefixTypes).forEach(type => {
  let sum = 0
  const prefixes = prefixTypes[type]
  weightedPrefixTypes[type] = {}

  Object.keys(prefixes).forEach(prefixKey => {
    sum += prefixes[prefixKey]
  })

  Object.keys(prefixes).forEach(prefixKey => {
    weightedPrefixTypes[type][prefixKey] = prefixes[prefixKey] / sum
  })
})

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

const droptable = generateDroptable()

function generateDroptable () {
  let totalDropweight = 0

  const droptable = []
  Object.keys(items).forEach(key => {
    const item = items[key]

    item['drop-rate'] = item['drop-rate'] || 100
    totalDropweight += item['drop-rate']

    droptable.push(item)
  })

  droptable.forEach(item => {
    item['drop-chance'] = item['drop-rate'] / totalDropweight
  })

  return droptable
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

function getPrefixes (rarity, itemCat) {
  const possiblePrefixes = weightedPrefixTypes[itemCat]
  if (!possiblePrefixes) {
    console.warn('No possible prefixes in ' + itemCat)
  }
  const nPrefixes = rarities[rarity].prefixes

  const selectedCategories = []
  const selectedTypes = []

  while (selectedCategories.length < nPrefixes) {
    const prefixCat = getPrefixCategory(possiblePrefixes)
    if (!prefixes[prefixCat]) {
      console.log('no prefxies in prefixcat ' + prefixCat)
    }
    const prefixCategories = Object.keys(prefixes[prefixCat])
    const suggestedPrefix = prefixCategories[Math.floor(Math.random() * prefixCategories.length)]

    if (!suggestedPrefix) {
      continue
    }

    if (selectedCategories.indexOf(suggestedPrefix) === -1) {
      selectedCategories.push(suggestedPrefix)
      selectedTypes.push(prefixCat)
    }
  }

  let i = 0
  return selectedCategories.map(category => {
    const type = selectedTypes[i]
    i++
    if (!prefixes[type][category]) {
      console.error('No prefixes in ' + category)
    }
    const possible = Object.keys(prefixes[type][category])
    return {type, category, prefix: possible[Math.floor(Math.random() * possible.length)]}
  })
}

function getPrefixCategory (possiblePrefixes) {
  let rn = Math.random()
  for (const key of Object.keys(possiblePrefixes)) {
    const chance = possiblePrefixes[key]

    if (rn < chance) {
      return key
    }

    rn -= chance
  }
  console.error('Did not find prefix')
}

function getBaseItem () {
  let rn = Math.random()
  for (const item of droptable) {
    const chance = item['drop-chance']
    if (rn < chance) {
      return item
    }
    rn -= chance
  }

  console.error('Did not find base item')
}

function generateItem () {
  const item = getBaseItem()
  const rarity = randomizeRarity()
  const prefixes = getPrefixes(rarity, item.category)
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
    rarity: rarity,
    prefixes: prefixes,
    type: item.type
  }
  console.log(itemObj)

  return itemObj
}

module.exports = {generateItem}
