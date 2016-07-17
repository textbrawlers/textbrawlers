const itemgen = require('./itemgen.js')

module.exports.spawnitem = function * () {
  console.log('spawn item')
  const item = itemgen.generateItem()

  console.log(this.player.getNextClearSlot())
  this.player.setInventory(this.player.getNextClearSlot(), item)

  yield this.player.save()

  this.body = "success"

  this.body = {
    success: true,
    item
  }
}
