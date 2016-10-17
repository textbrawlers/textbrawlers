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

  selectEnemy (enemyId) {
    request.post('/api/game/fightNPC', {enemyId}).catch(err => console.error(err.stack || err))
  }

  renderEnemy (enemy, id) {
    const style = {
      background: 'green',
      margin: 15
    }

    return (
      <a onClick={() => this.selectEnemy(id)}>
        <div style={style}>
          Name: {enemy.name}; hp: {enemy.stats.stats[0].value}
        </div>
      </a>
    )
  }

  render () {
    return (
      <div className='page-game-fight-selection'>
        Select enemy:

        {this.state.enemies.map((enemy, id) => this.renderEnemy(enemy, id))}
      </div>
    )
  }
}
