import React from 'react'
import 'client/css/account.scss'
import InventorySlot from './inventorySlot.js'
import AccountAPI from 'common/api/account.js'
import Inventory from 'common/game/inventory.js'
import InvItem from './invItem.js'
import request from 'common/api/request.js'

const INV_WIDTH = 12
const INV_HEIGHT = 10
const INV_MARGIN = 5
const INV_SLOT_SIZE = 50

export default class GameIndex extends React.Component{

  constructor() {
    super()

    this.state = {}

    this.load()

    this.getItem = this.getItem.bind(this)
    this.requestItem = this.requestItem.bind(this)

    this.updateInventory()
  }

  async load() {
    //const player =(await AccountAPI.get()).json
  }

  getItem(inventory, index){
    const item = this.state.inventory && this.state.inventory.get(index)
    if (!item){
      return
    }
    return <InvItem item={item} switchItems={this.switchItems.bind(this)} inventory="inventory" slot={index}/>
  }

  createSlot(x, y, index) {
    const style = {
      top: INV_MARGIN + y * (INV_MARGIN + INV_SLOT_SIZE),
      left: INV_MARGIN + x * (INV_MARGIN +INV_SLOT_SIZE),
      position: 'absolute'
    }
    return <InventorySlot style={style} key={index} switchItems={this.switchItems.bind(this)} inventory="inventory" slot={index}> {this.getItem('inventory', index)} </InventorySlot>
  }

  async switchItems(data) {
    const jsonInv = (await request.post('/api/game/swapItems', data)).json
    this.updateInventory(jsonInv)
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

  async updateInventory(jsonInv) {
    if (!jsonInv) {
      jsonInv = (await request.get('/api/game/requestInventory')).json
    }
    const inventory = await Inventory.fromJSON(jsonInv)
    this.setState({inventory})
  }

  async requestItem(){
    const resp = (await request.post('/api/game/requestItem')).json
    this.updateInventory(resp)
  }

  render() {
    return (
      <div className='container'>
        <div className="window equip-window">
          <h2>Equipped Items</h2>
          <div className="equip">
            <InventorySlot switchItems={this.switchItems.bind(this)} special="head" slot="0" inventory="equipped" />
            <InventorySlot switchItems={this.switchItems.bind(this)} special="body" slot="1" inventory="equipped" />
            <InventorySlot switchItems={this.switchItems.bind(this)} special="legs" slot="2" inventory="equipped" />
            <InventorySlot switchItems={this.switchItems.bind(this)} special="boots" slot="3" inventory="equipped" />
            <InventorySlot switchItems={this.switchItems.bind(this)} special="lefthand" slot="4" inventory="equipped" />
            <InventorySlot switchItems={this.switchItems.bind(this)} special="righthand" slot="5" inventory="equipped" />
          </div>
        </div>

        <div className="window inventory-window">
          <h2>Inventory</h2>
          <div className="inventory">
            {this.getInventory()}
          </div>
          <div className="bottom-inventory">
            <div className="recraft-inventory">

              <InventorySlot switchItems={this.switchItems.bind(this)} special="craft-1" slot="0" inventory="assembler" />
              <InventorySlot switchItems={this.switchItems.bind(this)} special="craft-2" slot="1" inventory="assembler" />
              <InventorySlot switchItems={this.switchItems.bind(this)} special="craft-3" slot="2" inventory="assembler" />
              <InventorySlot switchItems={this.switchItems.bind(this)} special="craft-4" slot="3" inventory="assembler" />
              <button className="craft-button">Reassemble</button>
            </div>
          </div>
        </div>

        <button id="spawnItem" onClick={this.requestItem}>Spawn Item</button>

        <br />

        <div className="window tooltip-window">
          <div id="characterstats" className="tooltip tooltip-stat">
          </div>
        </div>
      </div>
    )
  }
}
