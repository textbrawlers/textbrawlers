import React from 'react'
import { DropTarget } from 'react-dnd'

class InventorySlot extends React.Component {

  componentWillReceiveProps (nextProps) {}

  render () {
    let specialClass = ''
    if (this.props.special) {
      specialClass = ` inv-${this.props.special}`
    }

    const { connectDropTarget, isOver } = this.props

    return connectDropTarget(
      <div className={`inv-slot${specialClass}`} style={this.props.style} data-slot={this.props.slot}>
        {isOver && <img className='itemmove' src={'/client/png/itemmove.png'} />}
        {this.props.children}
      </div>
    )
  }
}

const target = {
  drop(droppedItem, targetMonitor, targetSlot) {
    const res = {
      inventory: droppedItem.inventory,
      item: parseInt(droppedItem.slot)
    }
    return res
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  didDrop: monitor.didDrop(),
  isOverCurrent: monitor.isOver({ shallow: true })
})

const types = props => {
  const accepts = []
  if (typeof props.accepts === 'string') {
    accepts.push('item-' + props.accepts)
  }
  if (props.accepts === 'any') {
    accepts.push('item-head')
    accepts.push('item-torso')
    accepts.push('item-legs')
    accepts.push('item-feet')
    accepts.push('item-hand')
  }

  return accepts
}

export default DropTarget(types, target, collect)(InventorySlot)
