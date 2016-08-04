import React from 'react'
import { DropTarget } from 'react-dnd'

class InventorySlot extends React.Component {

  render() {
    let specialClass = ''
    if (this.props.special) {
      specialClass = ` inv-${this.props.special}`
    }
  
    const { connectDropTarget, isOver } = this.props

    return connectDropTarget(
      <div className={`inv-slot${specialClass} ${isOver ? 'inv-slot-over' : ''}`}  style={this.props.style} data-slot={this.props.slot}>
        {this.props.children}
      </div>
    )
  }
}

const target = {
  drop() {
    return {
      name: 'test'
    }
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

export default DropTarget('item', target, collect)(InventorySlot)
