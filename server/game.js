import ItemGen from 'common/game/itemGenerator.js'

export async function requestItem(ctx){
  ctx.player.inventory.push(ItemGen.genitem())

  this.body = { success: true }
}
