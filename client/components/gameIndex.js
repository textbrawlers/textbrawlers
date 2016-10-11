import React, { Component } from 'react'
import 'client/css/game-inventory.scss'
import { ContextMenu, MenuItem, ContextMenuLayer } from 'react-contextmenu'
import { browserHistory } from 'react-router'
import InventorySlot from './inventorySlot.js'
import Player from 'common/game/player.js'
import InvItem from './invItem.js'
import request from 'common/api/request.js'
import CharacterStats from './characterStats.js'
import CreateItem from './createItem.js'

const INV_WIDTH = 10
const INV_HEIGHT = 4

export default class GameIndex extends Component {

  constructor () {
    super()

    this.state = {
      player: {

      }
    }

    this.getItem = this.getItem.bind(this)
    this.requestItem = this.requestItem.bind(this)
    this.createSpecialSlot = this.createSpecialSlot.bind(this)
    this.reassemble = this.reassemble.bind(this)
    this.createItem = this.createItem.bind(this)
    this.createItemCallback = this.createItemCallback.bind(this)

    this.updatePlayer()
  }

  async request (url, params) {
    const resp = (await request.post(url, params)).json
    this.updatePlayer(resp)
  }

  async reassemble () {
    await this.request('/api/game/reassemble')
  }

  createItemCallback (resp) {
    if (resp === 'item-created') {
      this.updatePlayer()
    }

    this.setState({
      creatingItem: false
    })
  }

  markSeen ({ slot, inventory }) {
    this.request('/api/game/markItemSeen', { slot, inventory }).catch(console.error.bind(console))
  }

  getItem (inventory, index) {
    const item = this.state.player[inventory] && this.state.player[inventory].get(index)
    if (!item) {
      return
    }
    return <ContextMenuInvItem item={item} switchItems={this.switchItems.bind(this)} markSeen={this.markSeen.bind(this)} inventory={inventory} slot={index} />
  }

  createSlot (index) {
    return (
      <InventorySlot accepts='any' key={index} switchItems={this.switchItems.bind(this)} inventory='inventory' slot={index}>
        {this.getItem('inventory', index)}
      </InventorySlot>
    )
  }

  async switchItems (data) {
    const jsonPlayer = (await request.post('/api/game/swapItems', data)).json
    this.updatePlayer(jsonPlayer)
  }

  getInventory () {
    let slots = []
    let index = 0
    for (let y = 0; y < INV_HEIGHT; y++) {
      for (let x = 0; x < INV_WIDTH; x++) {
        slots.push(this.createSlot(index))
        index++
      }
    }

    return slots
  }

  async updatePlayer (jsonPlayer) {
    if (!jsonPlayer) {
      jsonPlayer = (await request.get('/api/user/get')).json
    }
    const player = await Player.fromJSON(jsonPlayer)
    this.setState({player})
  }

  async requestItem () {
    const resp = (await request.post('/api/game/requestItem')).json
    this.updatePlayer(resp)
  }

  createItem () {
    this.setState({ creatingItem: true })
  }

  createSpecialSlot (inventory, slot, special = '', accepts = 'any') {
    return (

      <InventorySlot accepts={accepts} special={special} switchItems={this.switchItems.bind(this)} inventory={inventory} slot={slot}>
        {this.getItem(inventory, slot)}
      </InventorySlot>
    )
  }

  render () {
    return (
      <div className='page-game-inventory'>
        <InventoryItemContextMenu />
        <div className='container-inventory'>
          <div className='content-background'>
            <div className='window equip-window'>
              <h2>Equipped Items</h2>
              <div className='equip windowcontent'>
                <div className='equip-itemslot equip-right'>
                  {this.createSpecialSlot('equipped', 0, 'head', 'head')}
                  {this.createSpecialSlot('equipped', 6, 'trinket', 'trinket')}
                </div>
                <div className='equip-itemslot'>
                  {this.createSpecialSlot('equipped', 4, 'lefthand', 'hand')}
                  {this.createSpecialSlot('equipped', 1, 'body', 'torso')}
                  {this.createSpecialSlot('equipped', 5, 'righthand', 'hand')}
                </div>
                <div className='equip-itemslot'>
                  {this.createSpecialSlot('equipped', 2, 'legs', 'legs')}
                </div>
                <div className='equip-itemslot'>
                  {this.createSpecialSlot('equipped', 3, 'boots', 'feet')}
                </div>
              </div>
            </div>
            <div className='window inventory-window'>
              <h2>Inventory</h2>
              <div className='inventory windowcontent'>
                {this.getInventory()}
              </div>
              <div className='bottom-tabs'>
                <div className='inventory-tabs'>
                  {this.createSpecialSlot('reassemble', 4, 'craft-4', 'any')}
                  {this.createSpecialSlot('reassemble', 5, 'craft-5', 'any')}
                  {this.createSpecialSlot('reassemble', 6, 'craft-6', 'any')}
                  {this.createSpecialSlot('reassemble', 7, 'craft-7', 'any')}
                  {this.createSpecialSlot('reassemble', 8, 'craft-8', 'any')}
                </div>
              </div>
              <div className='bottom-inventory'>
                <div className='recraft-inventory'>
                  {this.createSpecialSlot('reassemble', 0, 'craft-1', 'any')}
                  {this.createSpecialSlot('reassemble', 1, 'craft-2', 'any')}
                  {this.createSpecialSlot('reassemble', 2, 'craft-3', 'any')}
                  {this.createSpecialSlot('reassemble', 3, 'craft-4', 'any')}
                  <button onClick={this.reassemble} className='button craft'>
                    Reassemble
                  </button>
                </div>
              </div>
            </div>
          </div>
          {this.state.creatingItem && (
            <div className='window' style={{position: 'absolute', left: 0, top: 0}}>
              <h2>Create Item</h2>
              <div className='windowcontent'>
                <CreateItem callback={this.createItemCallback} />
              </div>
            </div>
          )}
          <br />
          <button id='spawnItem' onClick={this.requestItem}>
            Spawn Item
          </button>
          <button onClick={this.createItem}>
            Create
          </button>
          <br />
          <div className='window tooltip-window'>
            <div id='characterstats' className='tooltip tooltip-stat'>
              <CharacterStats player={this.state.player} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const ContextMenuInvItem = ContextMenuLayer('inventory-item', props => props)(InvItem)

class InventoryItemContextMenu extends Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    return (
      <ContextMenu identifier='inventory-item'>
        <MenuItem data={{action: 'view-details'}} onClick={this.handleClick}>
          View Details
        </MenuItem>
      </ContextMenu>
    )
  }

  handleClick (e, data) {
    const action = data.action

    if (action === 'view-details') {
      const item64 = window.btoa(JSON.stringify(data.item.serialize()))
      browserHistory.push(`/game/item/${item64}`)
    }
  }
}
