import Inventory from './inventory.js'

const slots = {
  0: 'head',
  1: 'torso',
  2: 'legs',
  3: 'feet',
  4: 'hand',
  5: 'hand',
  6: 'trinket'
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

EquippedInventory.SLOT_HEAD = 0
EquippedInventory.SLOT_BODY = 1
EquippedInventory.SLOT_LEGS = 2
EquippedInventory.SLOT_FEET = 3
EquippedInventory.SLOT_LEFT_HAND = 4
EquippedInventory.SLOT_RIGHT_HAND = 5
EquippedInventory.SLOT_TRINKET = 6
