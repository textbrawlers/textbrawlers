import React from 'react'
import items from 'common/items/items.js'
import Item from 'common/game/item.js'
import InvItem from '../invItem.js'
import InventorySlot from '../inventorySlot.js'
import { getDroptable } from 'common/game/itemGenerator.js'

export default class extends React.Component {

  constructor() {
    super()

    this.state = {
      droptable: []
    }

    getDroptable().then(droptable => {
      this.setState({ droptable })
    })
  }
  
  render() {
    const table = this.state.droptable.map(entry => (
      <tr>
        <td>{entry.item.name}</td>
        <td>{Math.round(entry.chance * 100 * 100) / 100}%</td>
      </tr>
    ))

    return <table><tbody>{table}</tbody></table>
  }
}
