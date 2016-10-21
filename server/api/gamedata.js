import getItems from 'common/items/items.js'
import Item from 'common/game/item.js'

export async function items (ctx) {
  const items = (await getItems()).items

  console.log(typeof items[0])

  const jsonItems = items.map(baseItem => new Item(baseItem)).map(item => {
    return {
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
    }
  })

  ctx.body = { items: jsonItems }
}
