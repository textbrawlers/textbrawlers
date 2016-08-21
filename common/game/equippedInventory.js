import Inventory from './inventory.js'

const slots = {
  0: 'head',
  1: 'torso',
  2: 'legs',
  3: 'feet',
  4: 'hand',
  5: 'hand'
}

export default class EquippedInventory extends Inventory {
  canSet (slot, item) {
    if (item) {
      if (slots[slot] !== item.slot) {
        return false
      }
    }
    return true
  }
}
