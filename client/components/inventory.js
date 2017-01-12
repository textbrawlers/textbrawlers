import React, { Component } from 'react'
import 'client/css/inventory.scss'
import InventorySlot from './inventorySlot2.js'
import { connect } from 'react-redux'
import InventoryItem from './invItem.js'

const INV_WIDTH = 10
const INV_HEIGHT = 4

class Inventory extends Component {

  renderInventorySlots () {
    if (!this.props.player || !this.props.player.inventory) {
      return <p>Loading</p>
    }
    const inventory = this.props.player.inventory.inventory

    return [...inventory.slice(0, INV_WIDTH * INV_HEIGHT)].map((item, slot) => (
      <InventorySlot key={slot} >
        {item && <InventoryItem slot={slot} item={item} inventory={inventory} />}
      </InventorySlot>
    ))
  }

  render () {
    return (
      <div className='tb-inventory'>
        {this.renderInventorySlots()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  player: state.inventoriesById.me
})

const mapDispatchToProps = (dispatch) => ({
})

const MyInventory = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inventory)

export default MyInventory
