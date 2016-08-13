import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
  componentWillMount () {
    this.forceUpdate()
  }

  render () {
    return (

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
    )
  }
}
