import Item from './item.js'
import 'core-js/fn/object/entries'

export default class Inventory {
  constructor(jsonInventory) {
    this.inventory = {}

    Object.entries(jsonInventory).forEach(([slot, jsonItem]) => {
      this.setItem(slot, new Item(jsonItem))
    })
  }


  setItem(slot, item) {

  }
}
