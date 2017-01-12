import React, { Component } from 'react'
import 'client/css/pageinventory.scss'
import Equipped from './equipped.js'
import Inventory from './inventory.js'
import EquippedStats from './equippedStats.js'
import InventoryTabs from './inventoryTabs.js'
import Reassembler from './reassembler.js'
import { connect } from 'react-redux'

class PageInventory extends Component {

  render () {
    const {player} = this.props

    if (!player || !player.inventory) {
      return <div>Loading...</div>
    }

    return (
      <div className='tb-pageinventory'>
        <div className='pagerow'>
          <Equipped />
          <Inventory />
        </div>
        <div className='pagerow'>
          <EquippedStats player={player.inventory} />
          <InventoryTabs />
          <Reassembler />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  player: state.inventoriesById.me
})

const mapDispatchToProps = (dispatch) => ({
})

const ConnectedPageInventory = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageInventory)

export default ConnectedPageInventory
