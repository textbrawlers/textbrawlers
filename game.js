module.exports.inventory = function * () {
  


  this.body = {
    success: true,
    inventory: this.player.getFullInventory()
  }
}
