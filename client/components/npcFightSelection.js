import React, { Component } from 'react'
import request from 'common/api/request.js'

export default class NPCFightSelection extends Component {

  constructor () {
    super()

    this.state = {
      enemies: [],
      level: 1
    }

    this.clearNPCs = this.clearNPCs.bind(this)
    this.setNpcsOnLevel = this.setNpcsOnLevel.bind(this)
  }

  requestNPCSelectionData () {
    return request.get('/api/game/requestNPCSelectionData').then(resp => {
      const enemies = resp.json.npcs
      const npcLevel = resp.json.npcLevel
      const level = resp.json.npcLevel
      this.setState({ enemies, npcLevel, level })
    }).catch(err => console.error(err.stack || err))
  }

  componentWillMount () {
    this.requestNPCSelectionData()
  }

  getSelectedLevel () {
    if (document.getElementById('level')) {
      const e = document.getElementById('level')
      return e.options[e.selectedIndex].value
    } else {
      return 1
    }
  }

  fightNpc (name) {
    request.post('/api/game/fightNpc', {name, level: this.state.level}).catch(err => console.error(err.stack || err))
  }

  clearNPCs () {
    request.post('/api/game/clearNPCs', {}).catch(err => console.error(err.stack || err)).then(() => {
      this.requestNPCSelectionData()
    })
  }

  setNpcsOnLevel () {
    let level = this.getSelectedLevel()
    this.setState({ level })
  }

  renderEnemy (name, defeated) {
    let color = defeated ? 'green' : 'red'
    const style = {
      background: color,
      margin: 15
    }

    return (
      <a onClick={() => this.fightNpc(name)} key={name}>
        <div style={style}>
          Name: {name}
        </div>
      </a>
    )
  }

  renderDifficulties () {
    const getDiffOption = (number) => {
      if (number === this.state.npcLevel) {
        return (
          <option key={number} value={number} selected='selected'>{number}</option>
        )
      } else {
        return (
          <option key={number} value={number}>{number}</option>
        )
      }
    }

    let diffArr = []
    if (this.state.npcLevel) {
      for (let i = 1; i < this.state.npcLevel + 1; i++) {
        diffArr.push(getDiffOption(i))
      }
    } else {
      diffArr.push(getDiffOption(1))
    }

    return (
      <select id='level' onChange={this.setNpcsOnLevel}>
        {diffArr}
      </select>
    )
  }

  render () {
    const selectedEnemies = this.state.enemies[this.state.level - 1]

    return (
      <div className='page-game-fight-selection'>
        Select enemy: {
          selectedEnemies && selectedEnemies.map(enemy => this.renderEnemy(enemy.name, enemy.defeated))
        }
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
