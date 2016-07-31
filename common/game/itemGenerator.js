import getItems from 'common/items/items.js'
import getPrefixes from 'common/items/prefixes.js'
import Item from 'common/game/item.js'

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

export async function getDroptable() {
  const items = (await getItems()).items
  const possibleItems = items.filter(item => item.category !== 'set')
  const totalChance = possibleItems.reduce((val, item) => val + (item.dropRate || 100), 0)

  const droptable = []
  possibleItems.forEach(item => {
    const dropRate = item.dropRate || 100

    droptable.push({
      chance: dropRate / totalChance,
      item
    })
  })
  return droptable
}

function getRandom(droptable) {
  const totalChance = droptable.reduce((val, item) => val + item.chance, 0)

  let rn = Math.random()

  for (const item of droptable) {
    if (rn < item.chance) {
      return item
    }
    rn -= item.chance
  }
}

export async function generateItem() {
  const droptable = await getDroptable()

  const { prefixes, possible } = await getPrefixes()
  console.log('prefixes', prefixes)

  const baseItem = getRandom(droptable).item
  const randomRarity =  getRandom(rarities)

  const rarity = randomRarity.rarity

  const item = new Item(baseItem, { rarity })

  return item

}
