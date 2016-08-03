import React from 'react'
import TetherComponent from 'react-tether'

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

  getEmpowerStats(item) {
    return item.empoweredStats.map(conf => {

      const stats = conf.stats.map(stat => {
        const statTooltip = stat.render(stat => `<b>${stat}</b>`)
        return <p dangerouslySetInnerHTML={{__html: statTooltip}}></p>
      })

      return (
        <div>
          <p>Empowers {conf.category}:</p>
          {stats}
        </div>
      )
    })
  }

  createTooltip() {
    const item = this.props.item

    const characterStats = item.characterStats.map(stat => {
      const statTooltip = stat.render(stat => `<b>${stat}</b>`)
      return <p dangerouslySetInnerHTML={{__html: statTooltip}}></p>
    })

    const attackStats = item.attackStats.map(stat => {
      const statTooltip = stat.render(stat => `<b>${stat}</b>`)
      return <p dangerouslySetInnerHTML={{__html: statTooltip}}></p>
    })

    let characterStatsDiv
    if (item.characterStats.length) {
      characterStatsDiv = (
        <div>
          <p>Character:</p>
          {characterStats}
        </div>
      )
    }

    let attackStatsDiv
    if (item.attackStats.length) {
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

    const className = `item item-${item.rarity}`

    let tooltip

    if (this.state.tooltipVisible) {
      tooltip = this.createTooltip()
    }

    return (
      <div style={tooltipContainerStyle}>
        <TetherComponent attachment="top left" targetAttachment="top right" targetOffset="0 4px" constraints={[{to: 'window', pin: true}]}>
          <img className={className}  src={item.image} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}/>
          { this.state.tooltipVisible && tooltip }
        </TetherComponent>
      </div>
    )
  }
}
