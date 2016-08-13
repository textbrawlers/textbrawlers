import React from 'react'
import InvItem from '../invItem.js'
import InventorySlot from '../inventorySlot.js'
import { getDroptable, generateItem } from 'common/game/itemGenerator.js'

export default class extends React.Component {

  constructor () {
    super()

    this.state = {
      droptable: []
    }

    getDroptable().then(droptable => {
      this.setState({droptable})
    })

    this.genitem = this.genitem.bind(this)
  }

  async genitem () {
    const item = await generateItem()

    this.setState({ items: [item] })
  }

  async genMany (n) {
    const items = []
    for (let i = 0; i < n; i++) {
      items.push(await generateItem())
    }
    this.setState({items})
  }

  render () {
    const table = this.state.droptable.map(entry => (
      <tr>
        <td>
          {entry.item.name}
        </td>
        <td>
          {Math.round(entry.chance * 100 * 100) / 100}%
        </td>
      </tr>
    ))

    let invSlot

    const containerStyle = {
      margin: 2,
      display: 'inline-block'
    }

    if (this.state.items) {
      invSlot = this.state.items.map(item => {
        return (
          <div style={containerStyle}>
            <InventorySlot>
              <InvItem item={item} />
            </InventorySlot>
          </div>
        )
      })
    }

    return (
      <div>
        <button onClick={this.genitem}>
          Generate
        </button>
        <button onClick={() => this.genMany(100)}>
          Generate 100
        </button>
        <button onClick={() => this.genMany(10000)}>
          Generate 10.000
        </button>
        <br />
        {invSlot}
        <table>
          <tbody>
            {table}
          </tbody>
        </table>
      </div>
    )
  }
}
