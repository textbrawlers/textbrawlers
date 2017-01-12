import React, { Component } from 'react'
import TetherComponent from 'react-tether'
import 'client/css/equippedstats.scss'

export default class EquippedStats extends Component {

  render () {
    const {player} = this.props

    console.log('player', player, player.stats)

    return (
      <div className='tb-equippedstats'>
        <div className='stats'>
          <div className='title titlestats'>
            Stats
          </div>
          {player.stats.map(stat =>
            <Stat stat={stat} />
          )}

        </div>
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
        <div className='textrow'
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          dangerouslySetInnerHTML={{__html: statTooltip}} />
        {tooltip}
      </TetherComponent>
    )
  }
}
