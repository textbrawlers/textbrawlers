import React, { Component } from 'react'
import 'client/css/interface.scss'

export default class Game extends Component {
  render () {
    return (
      <div className='tb-interface'>
        <div className='title-bar'><img src='/client/png/interface/title.png'></img></div>
        <div className='flex-container'>
          <div className='link-container'>
          </div>
          <div className='content-container'>
            {React.cloneElement(this.props.children, { realtime: this.realtime })}
          </div>
        </div>
      </div>
    )
  }
}
