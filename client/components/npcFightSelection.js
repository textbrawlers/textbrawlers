import React, { Component } from 'react'
import request from 'common/api/request.js'

export default class NPCFightSelection extends Component {

  constructor () {
    super()

    this.state = {
      enemies: []
    }
  }

  componentWillMount () {
    request.get('/api/game/requestNPCs').then(resp => {
      this.setState({enemies: resp.json.npcs})
    }).catch(err => console.error(err.stack || err))
  }

  selectEnemy (enemy) {
    request.post('/api/game/fightNPC').catch(err => console.error(err.stack || err))
  }

  renderEnemy (enemy) {
    const style = {
      background: 'green',
      margin: 15
    }

    return (
      <a onClick={() => this.selectEnemy(enemy)}>
        <div style={style}>
          Name: {enemy.name}; hp: {enemy.maxhp}
        </div>
      </a>
    )
  }

  render () {
    return (
      <div className='page-game-fight-selection'>
        Select enemy:

        {this.state.enemies.map(enemy => this.renderEnemy(enemy))}
      </div>
    )
  }
}
