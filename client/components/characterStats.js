import React, { Component } from 'react'


export default class CharacterStats extends Component {

  render() {
    const player = this.props.player
    console.log(player)
    if (player.stats) {
      return <pre>{JSON.stringify(player.stats, null, 2)}</pre>
    }

    return null
  }
}
