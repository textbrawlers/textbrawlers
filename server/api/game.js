import { generateItem } from 'common/game/itemGenerator.js'

export async function requestItem(ctx){
  ctx.player.inventory.push(generateItem())
}

export async function requestInventory(ctx){
  ctx.body = ctx.player.inventory.serialize()
}
