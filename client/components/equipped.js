import React, { Component } from 'react'
import 'client/css/equipped.scss'
import InventorySlot from './inventorySlot2.js'
import InventoryItem from './invItem.js'
import { connect } from 'react-redux'

const INV_SIZE = 7

class Equipped extends Component {

  renderInventorySlots () {
    if (!this.props.player || !this.props.player.inventory) {
      return <p>Loading</p>
    }

    const equippedInventory = this.props.player.inventory.equipped

    return [...equippedInventory.slice(0, INV_SIZE)].map((item, slot) => (
      <InventorySlot key={slot} >
        {item && <InventoryItem slot={slot} item={item} inventory={equippedInventory} />}
      </InventorySlot>
    ))
  }

  render () {
    return (
      <div className='tb-equipped'>
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

const MyEquipped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Equipped)

export default MyEquipped
