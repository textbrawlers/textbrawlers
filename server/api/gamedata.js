import getItems from 'common/items/items.js'
import getPrefixes from 'common/items/prefixes.js'
import Item from 'common/game/item.js'
import { getDroptable, generateItem } from 'common/game/itemGenerator.js'

const itemToJSON = item => ({
  id: item.id,
  type: item.type,
  slot: item.slot,
  icon: item.icon,
  name: item.displayName,
  stats: {
    attack: item.attackStats.serialize(),
    character: item.characterStats.serialize(),
    empowered: item.empoweredStats.map(({stats, category}) => ({
      category: category,
      stats: stats.serialize()
    }))
  }
})

export async function items (ctx) {
  const items = (await getItems()).items

  console.log(typeof items[0])

  const jsonItems = items.map(baseItem => new Item(baseItem)).map(itemToJSON)

  ctx.body = { items: jsonItems }
}

export async function prefixes (ctx) {
  const prefixes = (await getPrefixes())
  ctx.body = { prefixes: prefixes.prefixes }
}

export async function typePrefixMap (ctx) {
  const prefixes = (await getPrefixes())
  ctx.body = { map: prefixes.possible }
}

export async function droptable (ctx) {
  const droptable = (await getDroptable()).map(entry => {
    return {
      item: entry.item.id,
      chance: entry.chance
    }
  })

  ctx.body = { droptable }
}

export async function randomItem (ctx) {
  let num = parseInt(ctx.query.num)

  if (isNaN(num)) {
    num = 10
  }
  if (num < 1) {
    num = 1
  }
  if (num > 10000) {
    num = 10000
  }

  const itemPromises = []

  for (let i = 0; i < num; i++) {
    itemPromises.push(generateItem())
  }

  const items = (await Promise.all(itemPromises)).map(item => {
    return Object.assign(itemToJSON(item), {
      rarity: item.rarity,
      prefixes: item.prefixes.map(prefix => prefix.path)
    })
  })

  ctx.body = { items }
}
