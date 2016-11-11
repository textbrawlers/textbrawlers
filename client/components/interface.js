import React, { Component } from 'react'
import 'client/css/interface.scss'

export default class Game extends Component {
  render () {
    return (
      <div className='tb-interface'>
        <span className='red-text'>Interface</span>
        {React.cloneElement(this.props.children, { realtime: this.realtime })}
      </div>
    )
  }
}
