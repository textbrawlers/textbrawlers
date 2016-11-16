import React, { Component } from 'react'
import 'client/css/interface.scss'

export default class Game extends Component {
  render () {
    return (
      <div className='tb-interface'>
        <div className='title-bar'><img src='/client/png/interface/title.png' /></div>
        <div className='flex-container'>
          <div className='link-container'>
            <div className='link-cluster'>
              <div className='title titlelink'>
                Link Category
              </div>
              <div className='link-sub'>
                <a href=''>Link 1</a>
                <a href=''>Link 2</a>
              </div>
            </div>
          </div>
          <div className='content-container'>
            <div className='content-box'>
              {React.cloneElement(this.props.children, { realtime: this.realtime })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
