import React, { Component } from 'react'
import { Link } from 'react-router'
import RealtimeClient from 'client/realtime/realtimeClient.js'
import Friends from './friends.js'
import request from 'common/api/request.js'

export default class Game extends Component {
  constructor () {
    super()

    this.state = {
      realtime: {
        connected: false
      },

      social: {
        requests: []
      }
    }

    this.active = true

    this.connect = this.connect.bind(this)
    this.addFriend = this.addFriend.bind(this)

    this.updateSocial()
  }

  async updateSocial () {
    const social = (await request.get('/api/game/social')).json
    this.setState({social})
  }

  connect () {
    this.realtime.connect()
  }

  addFriend () {
    const name = window.prompt('Name?')
    request.post('/api/game/add', { name })
  }

  componentWillMount () {
    this.realtime = new RealtimeClient()

    this.realtime.on('change', () => {
      this.setState({
        realtime: this.realtime.state
      })
    })

    this.realtime.on('message-social', () => this.updateSocial())
  }

  componentWillUnmount () {
    this.realtime.close()
  }

  render () {
    return (
      <div>
        <Friends social={this.state.social} realtime={this.state.realtime} />
        <div style={{position: 'absolute'}}>
          Realtime status: {this.state.realtime.connected ? 'Connected' : 'Disconnected'}
          {!this.state.realtime.connected &&
            <button onClick={this.connect}>Reconnect</button>
          }
          <br />
          <button onClick={this.addFriend}>Add friend</button>
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
