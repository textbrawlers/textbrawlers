import React, { Component } from 'react'
import request from 'common/api/request.js'

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
      const enemies = resp.json.npcs
      const npcLevel = resp.json.npcLevel
      this.setState({ enemies, npcLevel })
    }).catch(err => console.error(err.stack || err))
  }

  componentWillMount () {
    this.requestNPCSelectionData()
  }

  fightLevel (level) {
    request.post('/api/game/fightLevel', {level}).catch(err => console.error(err.stack || err))
  }

  clearNPCs () {
    request.post('/api/game/clearNPCs', {}).catch(err => console.error(err.stack || err)).then(() => {
      this.requestNPCSelectionData()
    })
  }

  renderEnemy (name, defeated, index) {
    let color = defeated ? 'green' : 'red'
    const style = {
      background: color,
      margin: 15
    }

    return (
      <div key={index} style={style}>
        Name: {name}
      </div>
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
      for (let i = 1; i < this.state.npcLevel + 1; i++) {
        diffArr.push(getDiffOption(i))
      }
    } else {
      diffArr.push(getDiffOption(1))
    }

    return (
      <select id='level'>
        {diffArr}
      </select>
    )
  }

  render () {
    return (
      <div className='page-game-fight-selection'>
        Select enemy:

        {this.state.enemies.map((enemy, index) => this.renderEnemy(enemy.name, enemy.defeated, index))}
        <br />
        {this.renderDifficulties()}
        <br />
        <button id='clearNPCs' onClick={this.clearNPCs}>
          Clear NPCs
        </button>
        <button id='fightLevel' onClick={() => {
          let e = document.getElementById('level')
          let level = e.options[e.selectedIndex].value
          this.fightLevel(level)
        }}>
          Fight Level
        </button>
      </div>
    )
  }
}
