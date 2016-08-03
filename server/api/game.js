import { generateItem } from 'common/game/itemGenerator.js'

export async function requestItem(ctx){
  ctx.player.inventory.push(await generateItem())

  await ctx.player.save()

  ctx.body = ctx.player.inventory.serialize()
}

export async function requestInventory(ctx){
  ctx.body = ctx.player.inventory.serialize()
}
