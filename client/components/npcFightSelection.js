import React, { Component } from 'react'

export default class NPCFightSelection extends Component {

  constructor () {
    super()

    this.state = {
      enemies: []
    }
  }

  componentWillMount () {
    // TODO: request(...)

    this.setState({
      enemies: [{
        name: 'Enemy 1',
        maxhp: 151,
        id: 1
      }, {
        name: 'Enemy 2',
        maxhp: 156,
        id: 2
      }]
    })
  }

  selectEnemy (enemy) {
    // TODO: request(...)
    console.log('select enemy', enemy)
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
