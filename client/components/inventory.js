import React, { Component } from 'react'
import 'client/css/inventory.scss'
import InventorySlot from './inventorySlot2.js'

const INV_WIDTH = 10
const INV_HEIGHT = 4

export default class Game extends Component {

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
      <div className='tb-inventory'>
        {this.renderInventorySlots()}
      </div>
    )
  }
}
