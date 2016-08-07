import React from 'react';
import { DragSource } from 'react-dnd';
import TetherComponent from 'react-tether'

class InventoryItem extends React.Component {

  constructor() {
    super()

    this.state = {
      tooltipVisible: false
    }

    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
  }

  handleMouseOver() {
    this.setState({
      tooltipVisible: true
    })
  } 

  handleMouseOut() {
    this.setState({
      tooltipVisible: false
    })
  }

  getEmpowerStats(item) {
    return item.empoweredStats.map((conf, i) => {

      const stats = conf.stats.getStats().map((stat, i) => {
        const statTooltip = stat.render(stat => `<b>${stat}</b>`)
        return <p key={i} dangerouslySetInnerHTML={{__html: statTooltip}}></p>
      })

      return (
        <div key={i}>
          <p>Empowers {conf.category}:</p>
          {stats}
        </div>
      )
    })
  }

  createTooltip() {
    const item = this.props.item

    const characterStats = item.characterStats.getStats().map((stat, i) => {
      const statTooltip = stat.render((stat, i) => `<b>${stat}</b>`)
      return <p key={i} dangerouslySetInnerHTML={{__html: statTooltip}}></p>
    })

    const attackStats = item.attackStats.getStats().map((stat, i) => {
      const statTooltip = stat.render(stat => `<b>${stat}</b>`)
      return <p key={i} dangerouslySetInnerHTML={{__html: statTooltip}}></p>
    })

    let characterStatsDiv
    if (!item.characterStats.isEmpty()) {
      characterStatsDiv = (
        <div>
          <p>Character:</p>
          {characterStats}
        </div>
      )
    }

    let attackStatsDiv
    if (!item.attackStats.isEmpty()) {
      attackStatsDiv = (
        <div>
          <p>Attack:</p>
          {attackStats}
        </div>
      )
    }

    let description
    if (item.description) {
      description = (
        <div className="description">
          {item.description}
        </div>
      )
    }

    const empowerStats = this.getEmpowerStats(item)

    return (
      <div className='tooltip'>
        <h2 className={`rarity-${item.rarity}`}>{item.displayName}</h2>
        {attackStatsDiv}
        {characterStatsDiv}
        {empowerStats}
        {description}
      </div>
    )
  }

  render() {
    const item = this.props.item

    const tooltipContainerStyle = {
      position: 'relative'
    }

    let className = `item item-${item.rarity}`

    let tooltip

    const { isDragging, connectDragSource } = this.props;

    if (this.state.tooltipVisible && ! isDragging) {
      tooltip = this.createTooltip()
    }

    if (isDragging) {
      className += ' item-dragging'
    }

    return connectDragSource(
      <div style={tooltipContainerStyle}>
        <TetherComponent attachment="top left" targetAttachment="top right" targetOffset="0 4px" constraints={[{to: 'window', pin: true}]}>
          <img className={className}  src={item.image} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}/>
          { tooltip }
        </TetherComponent>
      </div>
    )
  }
}

const itemSource = {
  beginDrag(props) {
    return {
      slot: props.slot,
      inventory: props.inventory
    }
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return
    }

    const to = monitor.getDropResult()
    const from = {
      inventory: props.inventory,
      item: props.slot
    }

    props.switchItems({ from, to })
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource('item', itemSource, collect)(InventoryItem)
