import React from 'react'
import Item from 'common/game/item.js'
import InvItem from '../invItem.js'
import InventorySlot from '../inventorySlot.js'
import { getDroptable } from 'common/game/itemGenerator.js'
import { generateItem } from 'common/game/itemGenerator.js'

export default class extends React.Component {

  constructor() {
    super()

    this.state = {
      droptable: []
    }

    getDroptable().then(droptable => {
      this.setState({ droptable })
    })

    this.genitem = this.genitem.bind(this)
  }

  async genitem() {
    const item = await generateItem()

    this.setState({ item })
  }
  
  render() {
    const table = this.state.droptable.map(entry => (
      <tr>
        <td>{entry.item.name}</td>
        <td>{Math.round(entry.chance * 100 * 100) / 100}%</td>
      </tr>
    ))

    let invSlot

    if (this.state.item) {
      invSlot = (
        <div>
          <InventorySlot>
            <InvItem item={this.state.item} />
          </InventorySlot>
        </div>
      )
    }

    return (
      <div>
        <button onClick={this.genitem}>Generate</button>
        {invSlot}
        <table>
          <tbody>{table}</tbody>
        </table>
      </div>
    )
  }
}
