import Item from './item.js'
import 'core-js/fn/object/entries'

export default class Inventory {
  constructor (items, size) {
    this.inventory = items || {}
    this.size = size
  }

  getNextClearSlot () {
    for (let i = 0; i < this.size; i++) {
      if (!this.inventory[i]) {
        return i
      }
    }

    return false
  }

  push (item) {
    const nextSlot = this.getNextClearSlot()

    if (nextSlot !== false) {
      return this.set(nextSlot, item)
    }

    return false
  }

  canSet (slot, item) {
    return true
  }

  set (slot, item) {
    if (item) {
      this.inventory[slot] = item
    } else {
      delete this.inventory[slot]
    }
  }

  get (slot) {
    return this.inventory[slot]
  }

  static fromJSON (Type, jsonInventory, size) {
    jsonInventory = jsonInventory || {}

    const items = {}

    for (let [slot, jsonItem] of Object.entries(jsonInventory)) {
      const item = Item.fromJSON(jsonItem)
      if (item) {
        items[slot] = item
      }
    }

    return new Type(items, size)
  }

  serialize () {
    const serialized = {}
    Object.entries(this.inventory).forEach(([slot, item]) => {
      serialized[slot] = item.serialize()
    })

    return serialized
  }
}
