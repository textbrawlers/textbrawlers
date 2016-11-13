import React, { Component } from 'react'
import 'client/css/pageinventory.scss'
import Equipped from './equipped.js'
import Inventory from './inventory.js'
import EquippedStats from './equippedStats.js'
import InventoryTabs from './inventoryTabs.js'
import Reassembler from './reassembler.js'

export default class Game extends Component {

  render () {
    return (
      <div className='tb-pageinventory'>
        <div className='pageinventoryrow-1'>
          <Equipped />
          <Inventory />
        </div>
        <div className='pageinventoryrow-2'>
          <EquippedStats />
          <InventoryTabs />
          <Reassembler />
        </div>
      </div>
    )
  }
}
