import React from 'react'

export default class extends React.Component {

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

  createTooltip() {
    const item = this.props.item

    const tooltipStyle = {
      position: 'absolute',
      left: 50,
      top: 0
    }


    const characterStats = item.characterStats.map(stat => {
      const statTooltip = stat.render(stat => `<b>${stat}</b>`)
      return <p dangerouslySetInnerHTML={{__html: statTooltip}}></p>
    })

    const attackStats = item.attackStats.map(stat => {
      const statTooltip = stat.render(stat => `<b>${stat}</b>`)
      return <p dangerouslySetInnerHTML={{__html: statTooltip}}></p>
    })

    return (
      <div style={tooltipStyle} className='tooltip'>
        <h2>{item.displayName}</h2>
        <p>Attack:</p>
        {attackStats}
        <p>Character:</p>
        {characterStats}
      </div>
    )
  }

  render() {
    const item = this.props.item
    console.log(this.props.item)

    const tooltipContainerStyle = {
      position: 'relative'
    }

    const className = `item item-${item.rarity}`

    let tooltip

    if (this.state.tooltipVisible) {
      tooltip = this.createTooltip()
    }

    return (
      <div style={tooltipContainerStyle}>
        <img className={className}  src={item.image} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}/>
        {tooltip}
      </div>
    )
  }
}
