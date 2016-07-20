const itemgen = require('./itemgen.js')

module.exports.spawnitem = function * () {
  const item = itemgen.generateItem()

  const nextSlot = this.player.getNextClearSlot()

  if (!nextSlot) {
    this.body = {
      success: false,
      error: 'Full inventory'
    }
    return
  }

  this.player.setInventory(nextSlot, item)

  yield this.player.save()

  this.body = {
    success: true,
  item}
}
