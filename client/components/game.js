import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Game extends Component {
  constructor () {
    super()

    this.state = {
      connected: false
    }

    this.active = true
  }

  componentWillMount () {
    console.log('will mount')
    const host = document.location.host.replace(/:.*/, '')
    const port = document.location.port
    const token = window.localStorage.getItem('key')

    this.socket = new window.WebSocket(`ws://${host}:${port}/?token=${token}`)

    this.socket.addEventListener('open', e => {
      this.setState({ connected: true })
      console.log('WS: Connected')
    })

    this.socket.addEventListener('close', e => {
      console.log('WS: Disconnected')
      if (this.active) {
        this.setState({ connected: false })
      }
    })

    this.socket.addEventListener('message', e => {
      console.log('message', e)
    })

    this.socket.addEventListener('error', e => {
      console.error('WebSocket erorr', e)
    })
  }

  componentWillUnmount () {
    this.socket.close()
    this.active = false
  }

  render () {
    return (
      <div>
        Realtime status: {this.state.connected ? 'Connected' : 'Disconnected'}
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
