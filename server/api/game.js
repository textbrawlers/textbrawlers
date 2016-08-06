import { generateItem } from 'common/game/itemGenerator.js'

export async function requestItem(ctx){
  ctx.player.inventory.push(await generateItem())

  await ctx.player.save()

  ctx.body = ctx.player.serialize()
}

export async function requestInventory(ctx){
  ctx.body = ctx.player.serialize()
}

export async function moveItem(ctx){
  let fromInv = getCorrectInventory(ctx, ctx.request.body.from.inventory)
  let toInv = getCorrectInventory(ctx, ctx.request.body.to.inventory)
  let fromPos = ctx.request.body.from.item
  let toPos = ctx.request.body.to.item

  let tempItem = fromInv.get(fromPos)
  fromInv.set(fromPos, toInv.get(toPos))
  toInv.set(toPos, tempItem)

  ctx.body = ctx.player.serialize()

  await ctx.player.save()
}

export async function reassemble(ctx) {
  const player = ctx.player

  if (player.reassemble.get(0) && player.reassemble.get(1) && player.reassemble.get(2) && player.reassemble.get(3)) {
    player.reassemble.set(0, undefined)
    player.reassemble.set(1, undefined)
    player.reassemble.set(2, undefined)
    player.reassemble.set(3, undefined)
    ctx.player.inventory.push(await generateItem())
  }


  ctx.body = ctx.player.serialize()
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
