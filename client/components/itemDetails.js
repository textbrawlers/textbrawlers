import React, { Component } from 'react'
import 'client/css/game-fight.scss'
import 'client/css/game-inventory.scss'
import Item from 'common/game/item.js'
import InventorySlot from './inventorySlot.js'
import InvItem from './invItem.js'
import ItemTooltip from './itemTooltip.js'

export default class ItemDetails extends Component {

  constructor () {
    super()

    this.state = {}
  }

  componentWillMount () {
    const base64 = this.props.params.itemId
    const itemJSON = JSON.parse(window.atob(base64))

    Item.fromJSON(itemJSON).then(item => {
      this.setState({ item })
      this.setState({ itemJSON })
    })
  }

  render () {
    if (!this.state.item) {
      return <div />
    }
    return (
      <div>
        <InventorySlot>
          <InvItem item={this.state.item} />
        </InventorySlot>
        <ItemTooltip item={this.state.item} />
        <pre>{JSON.stringify(this.state.itemJSON, undefined, 2)}</pre>
      </div>
    )
  }
}
