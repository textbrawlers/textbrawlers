import getItems from 'common/items/items.js'

export async function getDroptable() {
  const items = (await getItems()).items

  const totalChance = items.reduce((val, item) => val + (item.dropRate || 100), 0)

  const droptable = []

  items.forEach(item => {
    const dropRate = item.dropRate || 100

    droptable.push({
      chance: dropRate / totalChance,
      item
    })
  })

  return droptable
}

export async function generateItem() {
}
