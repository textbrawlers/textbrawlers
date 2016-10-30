import React, { Component } from 'react'
import request from 'common/api/request.js'
import Entity from 'common/game/entity.js'

const diffColorMap = {
  0: 'green',
  1: 'greenyellow',
  2: 'yellow',
  3: 'orange',
  4: 'red'
}

export default class NPCFightSelection extends Component {

  constructor () {
    super()

    this.state = {
      enemies: []
    }
  }

  componentWillMount () {
    request.get('/api/game/requestNPCs').then(resp => {
      const enemies = resp.json.npcs.map(npc => Entity.fromJSON(npc))
      this.setState({ enemies })
    }).catch(err => console.error(err.stack || err))
  }

  selectEnemy (enemyId) {
    request.post('/api/game/fightNPC', {enemyId}).catch(err => console.error(err.stack || err))
  }

  renderEnemy (enemy, id) {
    const style = {
      background: diffColorMap[enemy.difficulty],
      margin: 15
    }

    return (
      <a onClick={() => this.selectEnemy(id)} key={id}>
        <div style={style}>
          Name: {enemy.name}; hp: {enemy.stats.getValue('max-health')}
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
