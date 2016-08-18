import React, { Component } from 'react'

export default class CharacterStats extends Component {

  render () {
    const player = this.props.player

    let playerStats = []

    function getStats (stats) {
      return stats.stats.map((stat, i) => {
        const statTooltip = stat.render(stat => `<b>${stat}</b>`)
        return <p key={i} dangerouslySetInnerHTML={{__html: statTooltip}}></p>
      })
    }

    if (player.stats) {
      playerStats = getStats(player.stats)
    }

    let weapons = []

    if (player.weaponStats) {
      weapons = player.weaponStats.map(({slot, weapon, stats}, i) => {
        return (
          <div key={i}>
            <h2>{slot}</h2>
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
