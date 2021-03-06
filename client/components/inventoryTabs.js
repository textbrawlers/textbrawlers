import React, { Component } from 'react'
import 'client/css/inventorytabs.scss'
import InventorySlot from './inventorySlot2.js'

const INV_WIDTH = 5
const INV_HEIGHT = 1

export default class InventoryTabs extends Component {

  renderInventorySlots () {
    const slots = []
    for (let y = 0; y < INV_HEIGHT; y++) {
      for (let x = 0; x < INV_WIDTH; x++) {
        slots.push(<InventorySlot key={x + '.' + y} />)
      }
    }

    return slots
  }

  render () {
    return (
      <div className='tb-inventorytabs'>
        {this.renderInventorySlots()}
      </div>
    )
  }
}
