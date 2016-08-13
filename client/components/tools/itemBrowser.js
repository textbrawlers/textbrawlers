import React from 'react'
import items from 'common/items/items.js'
import Item from 'common/game/item.js'
import InvItem from '../invItem.js'
import InventorySlot from '../inventorySlot.js'

export default class extends React.Component {

  constructor () {
    super()

    this.state = {
      items: []
    }

    items().then(({items}) => {
      this.setState({ items})
    })
  }

  render () {
    const items = this.state.items.map(baseItem => {
      let rarity = 'legendary'
      if (baseItem.category === 'set') {
        rarity = 'set'
      }
      const item = new Item(baseItem, { rarity})
      const containerStyle = {
        margin: 2,
        display: 'inline-block'
      }
      return (
        <div style={containerStyle}>
          <InventorySlot>
            <InvItem item={item} />
          </InventorySlot>
        </div>
      )
    })

    return (
      <div>
        {items}
      </div>
    )
  }
}
