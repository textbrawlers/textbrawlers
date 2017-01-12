import React, { Component } from 'react'
import 'client/css/inventoryslot.scss'

export default class InventorySlot extends Component {
  render () {
    return (
      <div className='tb-inventoryslot'>
        <img className='background' src='/client/png/inventory/itembg.png' />
        <div className='item'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
