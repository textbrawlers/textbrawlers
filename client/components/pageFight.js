import React, { Component } from 'react'
import 'client/css/pagefight.scss'
import Equipped from './equipped.js'
import EquippedStats from './equippedStats.js'
import FightLog from './fightLog.js'

export default class Game extends Component {

  render () {
    return (
      <div className='tb-pagefight'>
        <div className='pagerow'>
          <Equipped />
          <FightLog />
          <Equipped />
        </div>
        <div className='pagerow'>
          <EquippedStats />
        </div>
      </div>
    )
  }
}
