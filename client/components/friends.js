import React, { Component } from 'react'
import { ContextMenu, MenuItem, ContextMenuLayer } from 'react-contextmenu'
import request from 'common/api/request.js'

export default class Friends extends Component {

  constructor () {
    super()
    this.addFriend = this.addFriend.bind(this)

    this.state = {
      friendName: ''
    }
  }

  componentWillMount () {
    //console.log('props', this.props)
      /*this.props.realtime.on('message-status.invites', (e) => {
      console.log(e)
      })*/
  }

  addFriend (e) {
    e.preventDefault()
    const name = this.state.friendName
    request.post('/api/game/add', { name }).then(({json}) => {
      if (json.success) {
        this.setState({friendName: ''})
      } else {
        window.alert('Could not send request: ' + json.message)
      }
    })
  }

  acceptFriend (req) {
    const name = req.from.username

    request.post('/api/game/add', { name }).then(({json}) => {
      if (!json.success) {
        window.alert('Could not accept request: ' + json.message)
      }
    })
  }

  denyFriend (req) {
    const id = req.from._id

    request.post('/api/game/removerequest', { id }).then(({json}) => {
      if (!json.success) {
        window.alert('Could not deny request: ' + json.message)
      }
    })
  }

  renderFriendContent () {
    const friendRequests = this.props.social.requests.map((req, i) => {
      return (
        <div key={i} className='friend-pending'>
          {req.from.username}
          <button className='decline' onClick={this.denyFriend.bind(this, req)} />
          <button className='accept' onClick={this.acceptFriend.bind(this, req)} />
        </div>
      )
    })

    const friends = this.props.social.friends.map((friend, i) => {
      return (<Friend key={i} friend={friend} />)
    })

    return (
      <div className='windowcontent'>
        <div className='friend-list'>
          {friends}
          {friendRequests}
          <form onSubmit={this.addFriend}>
            <label htmlFor='friend-name'>
              Friend username:
            </label>
            <br />
            <input
              className='input'
              type='text'
              value={this.state.friendName}
              onChange={e => this.setState({friendName: e.target.value})}
              id='friend-name' />
            <div className='button-center'>
              <input className='button' type='submit' value='Add friend' />
            </div>
          </form>
        </div>
      </div>
    )
  }

  renderFriendsOffline () {
    return (
      <div className='windowcontent'>
        <p>You are offline.</p>
        <button onClick={this.props.connect}>Reconnect</button>
      </div>
    )
  }

  render () {
    return (
      <div className="container-social">
        <FriendContextMenu />
        <div className='container-friend'>
          <div className='window friend-window'>
            <h2>Friends <div className='disconnected'></div></h2>
            {this.props.realtime.connected ? this.renderFriendContent() : this.renderFriendsOffline()}
          </div>
        </div>
        <div className='container-invite'>
          <div className='window invite-window'>
            <h2>Invites</h2>
              <div className='friend'>
              {this.props.friend.username}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class BasicFriend extends Component {
  render () {
    return (
      <div className='friend'>
        {this.props.friend.username}
        <div className='offline'>
        </div>
      </div>
    )
  }
}

const Friend = ContextMenuLayer('friend-context-menu', props => props)(BasicFriend)

class FriendContextMenu extends Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    return (
      <ContextMenu identifier='friend-context-menu'>
        <MenuItem data={{action: 'remove-friend'}} onClick={this.handleClick}>
          Remove Friend
        </MenuItem>
        <MenuItem data={{action: 'invite-game'}} onClick={this.handleClick}>
          Invite to Game
        </MenuItem>
      </ContextMenu>
    )
  }

  handleClick (e, data) {
    const action = data.action

    if (action === 'remove-friend') {
      request.post('/api/game/removefriend', { id: data.friend._id }).then(resp => {
        if (!resp.json.success) {
          window.alert('Could not remove friend: ' + resp.json.message)
        }
      })
    } else if (action === 'invite-game') {
      request.post('/api/game/inviteGame', { id: data.friend._id })
    }
  }
}
