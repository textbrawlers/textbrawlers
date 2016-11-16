import React, { Component } from 'react'
import 'client/css/equippedstats.scss'

export default class Game extends Component {

  render () {
    return (
      <div className='tb-equippedstats'>
        <div className='stats'>
          <div className='title titlestats'>
            Stats
          </div>
          <div className='textrow'>
            Stat 1: 40%
          </div>
          <div className='textrow'>
            Stat 2: 40
          </div>
        </div>
      </div>
    )
  }
}
