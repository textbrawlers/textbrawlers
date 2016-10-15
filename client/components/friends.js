import React, { Component } from 'react'
import { ContextMenu, MenuItem, ContextMenuLayer } from 'react-contextmenu'
import request from 'common/api/request.js'

export default class Friends extends Component {

  constructor () {
    super()
    this.addFriend = this.addFriend.bind(this)
    this.acceptInvite = this.acceptInvite.bind(this)
    this.toggleCollapseFriends = this.toggleCollapseFriends.bind(this)

    this.state = {
      friendName: '',
      invites: [],
      friendsExpanded: true
    }
  }

  componentWillMount () {
    this.props.realtime.on('message-status.invites', invites => {
      this.setState({invites: invites})
    })

    this.props.realtime.on('message-status.onlniefriends', friends => {
      this.setState({
        onlineFriends: friends
      })
    })
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

  acceptInvite (invite) {
    request.post('/api/game/acceptInvite', { id: invite.inviter }).then(({json}) => {
      if (!json.success) {
        window.alert('Could not accept invite: ' + json.message)
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

    const friendInfo = this.props.social.friends.map((friend, i) => {
      const friendOnline = this.state.onlineFriends.indexOf(friend._id) !== -1
      return { friendOnline, friend }
    }).sort(({friendOnline}) => !friendOnline)

    const friends = friendInfo.map(({friend, friendOnline}, i) => {
      const Friend = friendOnline ? OnlineFriend : OfflineFriend
      return (<Friend key={i} friend={friend} friendOnline={friendOnline} />)
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

  renderInviteWindow () {
    const invites = this.state.invites.map((invite, i) => {
      return (
        <div key={i} className='friend' onClick={() => this.acceptInvite(invite)}>
          {invite.username}
        </div>
      )
    })

    return (
      <div className='container-invite'>
        <div className='window invite-window'>
          <h2>Invites</h2>
          {invites}
        </div>
      </div>
    )
  }

  toggleCollapseFriends () {
    this.setState({
      friendsExpanded: !this.state.friendsExpanded
    })
  }

  render () {
    const friendsExpandedClass = this.state.friendsExpanded ? 'friends-expanded' : 'friends-collapsed'

    return (
      <div className='container-social'>
        <FriendContextMenu online />
        <FriendContextMenu />
        <div className={'container-friend ' + friendsExpandedClass}>
          <div className='window friend-window'>
            <h2 onClick={this.toggleCollapseFriends}>
              Friends
              <img src='/client/png/arrow.png' className='friends-toggle' />
              {!this.props.realtime.connected && <div className='disconnected' />}
            </h2>
            <div className='friends-collapsible'>
              {this.props.realtime.connected ? this.renderFriendContent() : this.renderFriendsOffline()}
              {this.state.invites.length ? this.renderInviteWindow() : ''}
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
        <div className={this.props.friendOnline ? 'online' : 'offline'} />
      </div>
    )
  }
}

const OnlineFriend = ContextMenuLayer('friend-context-menu-online', props => props)(BasicFriend)
const OfflineFriend = ContextMenuLayer('friend-context-menu-offline', props => props)(BasicFriend)

class FriendContextMenu extends Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    return (
      <ContextMenu identifier={`friend-context-menu-${this.props.online ? 'online' : 'offline'}`}>
        {this.props.online &&
          <MenuItem data={{action: 'invite-game'}} onClick={this.handleClick}>
            Invite to Game
          </MenuItem>
        }
        <MenuItem data={{action: 'remove-friend'}} onClick={this.handleClick}>
          Remove Friend
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
