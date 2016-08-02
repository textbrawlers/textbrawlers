import Item from './item.js'
import 'core-js/fn/object/entries'

export default class Inventory {
  constructor(items, size) {
    this.inventory = {}
    this.size = size

    items.forEach(item => {
      this.push(item)
    })
  }

  getNextClearSlot() {
    for (let i = 0; i < this.size; i++) {
      if (!this.inventory[i]) {
        return i
      }
    }
  }

  push(item) {
    const nextSlot = this.getNextClearSlot()

    if (nextSlot) {
      return this.set(nextSlot, item)
    }

    return false
  }

  set(slot, item) {
    if (!this.inventorySlot) {
      this.inventory[slot] = item
      return true
    }
    return false
  }

  get(slot) {
    return this.inventorySlot[slot]
  }

  fromJSON(jsonInventory, size) {
    const items = await Promise.all(jsonInventory.map(jsonItem => Item.fromJSON(jsonItem)))

    return new Inventory(items, size)
  }

  serialize() {
    return this.items.map(item => item.serialize())
  }
}
