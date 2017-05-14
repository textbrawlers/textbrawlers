import React, { Component } from 'react'
import 'client/css/fightalternatives.scss'

export default class Game extends Component {

  render () {
    return (
      <div className='tb-fightalternatives'>
        <div className='stats'>
          PVE
        </div>
        <div className='stats'>
          PVP
        </div>
      </div>
    )
  }
}
