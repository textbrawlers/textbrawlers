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
