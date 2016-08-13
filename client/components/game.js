import React, { Component } from 'react'

export default class Game extends Component {
  render () {
    return (
	<div>
	<div>
        <div className='links'>
          <div className='leftlinks'>
            <Link to='/'>
              <img src='/client/png/inventory.png' />
            </Link>
          </div>
          <div className='middlelinks'>
            <Link to='/'>
              <img className='title' src='/client/png/title.png' />
            </Link>
          </div>
          <div className='rightlinks'>
            <Link to='/'>
              <img src='/client/png/inventory.png' />
            </Link>
          </div>
        </div>
      </div>
	{this.props.children}
	</div>
	)
  }
}
