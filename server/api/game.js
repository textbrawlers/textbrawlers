import { generateItem } from 'common/game/itemGenerator.js'

export async function requestItem(ctx){
  ctx.player.inventory.push(await generateItem())

  await ctx.player.save()

  ctx.body = ctx.player.inventory.serialize()
}

export async function requestInventory(ctx){
  ctx.body = ctx.player.inventory.serialize()
}

export async function moveItem(ctx){
  let fromInv = getCorrectInventory(ctx, ctx.body.from.inventory)
  let toInv = getCorrectInventory(ctx, ctx.body.to.inventory)
  let fromPos = ctx.body.from.item
  let toPos = ctx.body.to.item

  let tempItem = fromInv[fromPos]
  fromInv[fromPos] = toInv[toPos]
  toInv[toPos] = tempItem

  ctx.body = ctx.player.inventory.serialize()
}

function getCorrectInventory(ctx, inventory){
  switch (inventory) {
    case 'equipped':
      return ctx.player.equipped
    case 'inventory':
      return ctx.player.inventory
    case 'assembler':
      return ctx.player.assembler
    default:
      return
  }
}
