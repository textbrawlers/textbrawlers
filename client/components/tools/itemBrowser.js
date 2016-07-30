import React from 'react'
import items from 'common/items/items.js'

export default class extends React.Component {

  constructor() {
    super()

    this.state = {
      items: []
    }

    items().then(items => {
      this.setState({ items })
    })
  }
  
  render() {
    const items = this.state.items.map(item => {
      return <div key={item.id}>{item.name}</div>
    })

    return (
      <div>
        <p>Item browser</p>
        {items}
      </div>
    )
  }
}
