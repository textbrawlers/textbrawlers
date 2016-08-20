import React, { Component } from 'react'
import { Link } from 'react-router'
import RealtimeClient from 'client/realtime/realtimeClient.js'
import Friends from './friends.js'
import request from 'common/api/request.js'
import { browserHistory } from 'react-router'

export default class Game extends Component {
  constructor () {
    super()

    this.state = {
      realtime: {
        connected: false
      },

      realtimeState: {},

      social: {
        requests: [],
        friends: []
      }
    }

    this.active = true

    this.connect = this.connect.bind(this)

    this.updateSocial()
  }

  async updateSocial () {
    const social = (await request.get('/api/game/social')).json
    try {
      this.setState({social})
    } catch (ex) {
      console.error(ex)
    }
  }

  connect () {
    this.realtime.connect()
  }

  componentWillMount () {
    this.realtime = new RealtimeClient()

    this.realtime.on('change', () => {
      try {
        this.setState({
          realtime: this.realtime.state
        })
      } catch (ex) {
        console.error(ex)
      }
    })

    this.realtime.on('message-social', () => this.updateSocial())

    this.realtime.on('message-startgame', () => {
      browserHistory.push('/game/fight')
    })
  }

  componentWillUnmount () {
    this.realtime.close()
  }

  render () {
    return (
      <div>
        <Friends social={this.state.social} connect={this.connect} realtimeState={this.state.realtime} realtime={this.realtime} />
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
          {this.props.children}
        </div>
      </div>
    )
  }
}
