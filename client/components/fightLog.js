import React, { Component } from 'react'
import 'client/css/fightlog.scss'

export default class Game extends Component {

  render () {
    return (
      <div className='tb-fightlog'>
        <div className='round allied'>
          <div className='title'>
            Your turn
          </div>
          <div className='textrow'>
            You attacked the guy
          </div>
        </div>
        <div className='round enemy'>
          <div className='title'>
            The guy´s turn
          </div>
          <div className='textrow'>
            The guy attacked you
          </div>
        </div>
      </div>
    )
  }
}
