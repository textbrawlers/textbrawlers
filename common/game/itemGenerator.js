import getItems from 'common/items/items.js'
import getPrefixes from 'common/items/prefixes.js'
import Item from 'common/game/item.js'
import Prefix from 'common/game/prefix.js'

const rarities = [{
  rarity: 'common',
  prefixes: 1,
  chance: 0.52
}, {
  rarity: 'uncommon',
  prefixes: 2,
  chance: 0.28
}, {
  rarity: 'rare',
  prefixes: 3,
  chance: 0.14
}, {
  rarity: 'legendary',
  prefixes: 4,
  chance: 0.06
}]

export async function getDroptable () {
  const items = (await getItems()).items
  const possibleItems = items.filter(item => item.category !== 'set')
  const totalChance = possibleItems.reduce((val, item) => val + (item.dropRate !== undefined ? item.dropRate : 100), 0)

  const droptable = []
  possibleItems.forEach(item => {
    const dropRate = item.dropRate !== undefined ? item.dropRate : 100

    droptable.push({
      chance: dropRate / totalChance,
      item,
      dropRate
    })
  })
  droptable.sort((a, b) => b.chance - a.chance)

  return droptable
}

function getRandom (droptable) {
  let rn = Math.random()

  for (const item of droptable) {
    if (rn < item.chance) {
      return item
    }
    rn -= item.chance
  }
}

function getRandomPrefix (possible, category, prefixes, usedCategories) {
  const totalChance = possible.reduce((val, item) => val + item.chance, 0)
  possible.forEach(item => {
    item.chance /= totalChance
  })
  const prefixType = getRandom(possible).type

  const possibleCategories = prefixes[prefixType]

  if (!possibleCategories) {
    console.warn(`No possible categories in ${prefixType}`)
    return
  }

  const prefixCategories = Object.entries(possibleCategories).map(([category, prefixes]) => ({category, prefixes}))
  const prefixCategory = prefixCategories[Math.floor(Math.random() * prefixCategories.length)]

  if (!prefixCategory) {
    console.warn(`No prefixes in ${prefixType}`)
    return
  }

  if (usedCategories.indexOf(prefixCategory.category) !== -1) {
    return
  }

  if (!prefixCategory.prefixes) {
    console.warn(`No prefixes property in ${prefixType}`)
    return
  }

  const possiblePrefixesInCat = Object.entries(prefixCategory.prefixes).map(([key, prefix]) => ({key, prefix}))

  const totalPrefixChance = possiblePrefixesInCat.reduce((val, prefix) => val + (prefix['drop-rate'] || 100), 0)

  possiblePrefixesInCat.forEach(possible => {
    possible.chance = (possible['drop-rate'] || 100) / totalPrefixChance
  })

  const prefix = getRandom(possiblePrefixesInCat)
  return new Prefix([prefixType, prefixCategory.category, prefix.key], prefixes[prefixType][prefixCategory.category][prefix.key])
}

function getRandomPrefixes (possiblePrefixes, baseItem, prefixes, nPrefixes) {
  const category = baseItem.category
  const possible = Object.entries(possiblePrefixes[category] || {}).map(([type, chance]) => ({type, chance}))

  if (possible.length === 0) {
    console.warn(`${category} has no possible prefixes`)
    return []
  }

  const generatedPrefixes = []
  const usedCategories = []
  let n = 0
  while (generatedPrefixes.length < nPrefixes && n <= 1000) {
    const prefix = getRandomPrefix(possible, category, prefixes, usedCategories)
    if (prefix) {
      if (prefix.path[2] === 'replicating' && n === 0) {
        continue
      }
      n++
      generatedPrefixes.push(prefix)
      usedCategories.push(prefix.path[1])
    }
  }
  if (n === 1000) {
    console.warn('Could not generate enough prefixes for', category)
  }

  if (generatedPrefixes.length !== nPrefixes) {
    console.warn(`Not enough prefixes for ${category}`)
  }

  return generatedPrefixes
}

export async function generateItem () {
  const droptable = await getDroptable()

  const { prefixes, possible } = await getPrefixes()

  const baseItem = getRandom(droptable).item
  const randomRarity = getRandom(rarities)
  const rarity = randomRarity.rarity

  const allPrefixes = getRandomPrefixes(possible, baseItem, prefixes, randomRarity.prefixes)

  const item = new Item(baseItem, { rarity, prefixes: allPrefixes, unseen: true })

  return item
}
