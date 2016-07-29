import React from 'react'
import 'app/client/css/account.scss'
import InventorySlot from './inventorySlot.js'

const INV_WIDTH = 12
const INV_HEIGHT = 10
const INV_MARGIN = 5
const INV_SLOT_SIZE = 50

export default class extends React.Component{

  createSlot(x, y, index) {
    const style = {
      top: INV_MARGIN + y * (INV_MARGIN + INV_SLOT_SIZE),
      left: INV_MARGIN + x * (INV_MARGIN +INV_SLOT_SIZE)
    }
    console.log(index)
    return <InventorySlot style={style} key={index} slot={`i${index}`} />
  }

  getInventory() {
    let slots = []
    let index = 0
    for (let y = 0; y < INV_HEIGHT; y++) {
      for (let x = 0; x < INV_WIDTH; x++) {
        slots.push(this.createSlot(x, y, index))
        index++
      }
    }

    return slots
  }

  render() {
    return (
      <div className='container'>
        <div className="window equip-window">
          <h2>Equipped Items</h2>
          <div className="equip">
            <InventorySlot special="head" slot="e0" />
            <InventorySlot special="body" slot="e1" />
            <InventorySlot special="legs" slot="e2" />
            <InventorySlot special="boots" slot="e3" />
            <InventorySlot special="lefthand" slot="e4" />
            <InventorySlot special="righthand" slot="e5" />
          </div>
        </div>

        <div className="window inventory-window">
          <h2>Inventory</h2>
          <div className="inventory">
            {this.getInventory()}
          </div>
          <div className="bottom-inventory">
            <div className="recraft-inventory">

              <InventorySlot special="craft-1" slot="c0" />
              <InventorySlot special="craft-2" slot="c1" />
              <InventorySlot special="craft-3" slot="c2" />
              <InventorySlot special="craft-4" slot="c3" />
              <button className="craft-button">Reassemble</button>
            </div>
          </div>
        </div>

        <button id="spawnItem">Spawn Item</button>

        <br />

        <div className="window tooltip-window">
          <div id="characterstats" className="tooltip tooltip-stat">
          </div>
        </div>
      </div>
    )
  }
}
