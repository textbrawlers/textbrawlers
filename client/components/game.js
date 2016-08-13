import React, { Component } from 'react'
import { Link } from 'react-router'
import RealtimeClient from 'client/realtime/realtimeClient.js'
import Friends from './friends.js'

export default class Game extends Component {
  constructor () {
    super()

    this.state = {
      realtime: {
        connected: false
      }
    }

    this.active = true

    this.connect = this.connect.bind(this)
  }

  connect () {
    this.realtime.connect()
  }

  componentWillMount () {
    this.realtime = new RealtimeClient()

    this.realtime.on('change', () => {
      this.setState({
        realtime: this.realtime.state
      })
    })
  }

  componentWillUnmount () {
    this.realtime.close()
  }

  render () {
    return (
      <div>
        <Friends />
        <div style={{position: 'absolute'}}>
          Realtime status: {this.state.realtime.connected ? 'Connected' : 'Disconnected'}
          {!this.state.realtime.connected &&
            <button onClick={this.connect}>Reconnect</button>
          }
          <br />
          Players online: {this.state.realtime.playerCount}
        </div>

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
        {this.props.children}
      </div>
    )
  }
}
