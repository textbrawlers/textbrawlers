import React from 'react'
import { DragSource } from 'react-dnd'
import TetherComponent from 'react-tether'
import ItemTooltip from './itemTooltip.js'

const targetSlot = {
  head: 0,
  torso: 1,
  legs: 2,
  feet: 3,
  hand: 4
}

class InventoryItem extends React.Component {

  constructor () {
    super()

    this.state = {
      tooltipVisible: false
    }

    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onClick (e) {
    const from = {
      inventory: this.props.inventory,
      item: this.props.slot
    }

    if (e.ctrlKey) {
      this.props.switchItems({from, to: {
        inventory: 'reassemble',
        item: -1
      }})
    }

    if (e.shiftKey) {
      this.props.switchItems({from, to: {
        inventory: 'equipped',
        item: targetSlot[this.props.item.slot]
      }})
    }
  }

  handleMouseOver () {
    this.setState({
      tooltipVisible: true
    })
  }

  handleMouseOut () {
    this.setState({
      tooltipVisible: false
    })
  }

  render () {
    const item = this.props.item

    const tooltipContainerStyle = {
      position: 'relative'
    }

    let className = `item item-${item.rarity}`

    let tooltip

    const { isDragging, connectDragSource } = this.props

    if (this.state.tooltipVisible && !isDragging) {
      tooltip = <ItemTooltip item={item} />
    }

    if (isDragging) {
      className += ' item-dragging'
    }

    return connectDragSource(
      <div style={tooltipContainerStyle}>
        <TetherComponent
          attachment='top left'
          targetAttachment='top right'
          targetOffset='0 4px'
          constraints={[{to: 'window', pin: true}]}>
          <img
            className={className}
            src={item.image}
            onClick={this.onClick}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut} />
          {tooltip}
        </TetherComponent>
      </div>
    )
  }
}

const itemSource = {
  beginDrag (props) {
    return {
      slot: props.slot,
      inventory: props.inventory
    }
  },

  endDrag (props, monitor) {
    if (!monitor.didDrop()) {
      return
    }

    const to = monitor.getDropResult()
    const from = {
      inventory: props.inventory,
      item: props.slot
    }

    props.switchItems({from, to})
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const types = props => {
  return `item-${props.item.slot}`
}

export default DragSource(types, itemSource, collect)(InventoryItem)
