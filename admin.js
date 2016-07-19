const itemgen = require('./itemgen.js')

module.exports.spawnitem = function * () {
  console.log('spawn item')
  const item = itemgen.generateItem()

  console.log(this.player.getNextClearSlot())
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
