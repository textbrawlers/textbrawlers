const db = require('monk')('localhost/retardarenan')
const users = db.get('users')

const Player = module.exports = function (data) {
  this.data = data
  this.key = data.key
}

Player.prototype.save = function * () {
  return yield users.findOneAndUpdate({key: this.key}, this.data)
}

Player.prototype.setInventory = function (slot, item) {
  item = Object.assign({}, item)
  delete item.sourceItem
  this.data.inventory = this.data.inventory || {}
  this.data.inventory[slot] = item
}

Player.prototype.getInventory = function (slot) {
  this.data.inventory = this.data.inventory || {}
  const item = this.data.inventory[slot]
  if (item && item.type) {
    return item
  }
  return undefined
}

Player.prototype.getFullInventory = function () {
  const inv = {}
  for (let i = 0; i < 120; i++) {
    const slot = `i${i}`
    inv[slot] = this.getInventory(slot)
  }

  for (let i = 0; i < 6; i++) {
    const slot = `e${i}`
    inv[slot] = this.getInventory(slot)
  }
  return inv
}

Player.prototype.getNextClearSlot = function () {
  for (let i = 0; i < 120; i++) {
    const slot = `i${i}`
    if (!this.getInventory(slot)) {
      return slot
    }
  }

  return undefined
}

Player.prototype.switchInventory = function (a, b) {
  const slotA = this.getInventory(a)
  const slotB = this.getInventory(b)

  this.setInventory(b, slotA)
  this.setInventory(a, slotB)

  console.log('switchInventory', a, b)
}

Player.find = function * (key) {
  return new Player(yield users.findOne({key}))
}
