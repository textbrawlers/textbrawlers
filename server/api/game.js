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
  console.log(ctx.request.body.from.inventory)
  let fromInv = getCorrectInventory(ctx, ctx.request.body.from.inventory)
  let toInv = getCorrectInventory(ctx, ctx.request.body.to.inventory)
  let fromPos = ctx.request.body.from.item
  let toPos = ctx.request.body.to.item

  let tempItem = fromInv.get(fromPos)
  fromInv.set(fromPos, toInv.get(toPos))
  toInv.set(toPos, tempItem)

  ctx.body = ctx.player.inventory.serialize()

  await ctx.player.save()
}

function getCorrectInventory(ctx, inventory){
  switch (inventory) {
    case 'equipped':
      return ctx.player.equipped
    case 'inventory':
      return ctx.player.inventory
    case 'reassemble':
      return ctx.player.reassemble
    default:
      return
  }
}
