import TetherComponent from 'react-tether'
import React, { Component } from 'react'

export default class CharacterStats extends Component {

  render () {
    const player = this.props.player

    let playerStats = []

    function getStats (stats) {
      return stats.stats.map((stat, i) => <Stat stat={stat} key={i} />)
    }

    if (player.stats) {
      playerStats = getStats(player.stats)
    }

    let weapons = []

    if (player.weaponStats) {
      weapons = player.weaponStats.map(({slot, weapon, stats}, i) => {
        return (
          <div key={i}>
            <h2>{weapon.displayName}</h2>
            <div>{getStats(stats)}</div>
          </div>
        )
      })
    }

    return (
      <div>
        <h2>Character Stats</h2>
        <div>{playerStats}</div>
        {weapons}
      </div>
    )
  }
}

class Stat extends Component {

  constructor () {
    super()

    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)

    this.state = {
      showTooltip: false
    }
  }

  mouseOver () {
    this.setState({ showTooltip: true })
  }

  mouseOut () {
    this.setState({ showTooltip: false })
  }

  render () {
    const stat = this.props.stat
    const statTooltip = stat.render(stat => `<b>${stat}</b>`)
    const tooltip = this.state.showTooltip && (
      <div className='content-background'>
        <div className='window detailed-tooltip-window'>
          <h2>{stat.name}</h2>
          <div className='detailed-tooltip'>{stat.detailedTooltip}</div>
        </div>
      </div>
    )
    return (
      <TetherComponent
        attachment='top left'
        targetAttachment='top left'
        targetOffset='25px 100px'
        constraints={[{to: 'window', pin: true}]}>
        <p
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          dangerouslySetInnerHTML={{__html: statTooltip}} />
        {tooltip}
      </TetherComponent>
    )
  }
}
