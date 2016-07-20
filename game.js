const itemgen = require('./itemgen.js')

module.exports.inventory = function * () {
  this.body = {
    success: true,
    inventory: this.player.getFullInventory()
  }
}

module.exports.inventorySwitch = function * () {
  this.player.switchInventory(this.request.body.a, this.request.body.b)

  console.log(this.request.body)

  yield this.player.save()

  this.body = {
    success: true
  }
}

module.exports.reassemble = function * () {
  const items = [
    this.player.getInventory('c0'),
    this.player.getInventory('c1'),
    this.player.getInventory('c2'),
    this.player.getInventory('c3')
  ]

  for (const item of items) {
    if (!item) {
      this.body = {
        success: false,
        error: 'You need 4 items to reassemble'
      }
      return
    }
  }

  this.player.setInventory('c0', undefined)
  this.player.setInventory('c1', undefined)
  this.player.setInventory('c2', undefined)
  this.player.setInventory('c3', undefined)

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
    success: true
  }
}
