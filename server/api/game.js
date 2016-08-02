import { generateItem } from 'common/game/itemGenerator.js'

export async function requestItem(ctx){
  ctx.player.inventory.push(await generateItem())

  await ctx.player.save()

  ctx.body = { success: true }
}

export async function requestInventory(ctx){
  ctx.body = ctx.player.inventory.serialize()
}
