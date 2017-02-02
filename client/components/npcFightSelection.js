import React, { Component } from 'react'
import request from 'common/api/request.js'
import Entity from 'common/game/entity.js'

export default class NPCFightSelection extends Component {

  constructor () {
    super()

    this.state = {
      enemies: []
    }

    this.clearNPCs = this.clearNPCs.bind(this)
  }

  requestNPCSelectionData () {
    request.get('/api/game/requestNPCSelectionData').then(resp => {
      const enemies = resp.json.npcs.map(npc => Entity.fromJSON(npc))
      const npcLevel = resp.json.npcLevel
      this.setState({ enemies, npcLevel })
    }).catch(err => console.error(err.stack || err))
  }

  componentWillMount () {
    this.requestNPCSelectionData()
  }

  selectEnemy (enemyId) {
    request.post('/api/game/fightNPC', {enemyId}).catch(err => console.error(err.stack || err))
  }

  clearNPCs () {
    request.post('/api/game/clearNPCs', {}).catch(err => console.error(err.stack || err)).then(() => {
      this.requestNPCSelectionData()
    })
  }

  renderEnemy (enemy, id) {
    const style = {
      background: 'pink',
      margin: 15
    }

    return (
      <a onClick={() => this.selectEnemy(id)} key={id}>
        <div style={style}>
          Name: {enemy.name}
        </div>
      </a>
    )
  }

  renderDifficulties () {
    function getDiffOption (number) {
      return (
        <option key={number} value={number}>{number}</option>
      )
    }

    let diffArr = []
    if (this.state.npcLevel) {
      for (let i = 1; i < this.state.npcLevel; i++) {
        diffArr.push(getDiffOption(i))
      }
    } else {
      diffArr.push(getDiffOption(1))
    }

    return (
      <select>
        {diffArr}
      </select>
    )
  }

  render () {
    return (
      <div className='page-game-fight-selection'>
        Select enemy:

        {this.state.enemies.map((enemy, id) => this.renderEnemy(enemy, id))}
        <br />
        {this.renderDifficulties()}
        <br />
        <button id='clearNPCs' onClick={this.clearNPCs}>
          Clear NPCs
        </button>
      </div>
    )
  }
}
