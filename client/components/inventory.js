import React, { Component } from 'react'
import 'client/css/inventory.scss'

const INV_WIDTH = 10
const INV_HEIGHT = 4

export default class Game extends Component {

  renderInventory () {
    const slots = []
    for (let y = 0; y < INV_HEIGHT; y++) {
      for (let x = 0; x < INV_WIDTH; x++) {
        slots.push(<div key={x + '.' + y}>X: {x}, Y: {y}</div>)
      }
    }

    return slots
  }

  render () {
    return (
      <div className='tb-inventory'>
        Inventory

        {this.renderInventory()}
      </div>
    )
  }
}
