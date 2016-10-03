
export default class RealtimePlayer {
  constructor (player, ws) {
    this.player = player
    this.ws = ws

    this.invites = []
  }

  send (id, data) {
    return new Promise((resolve, reject) => {
      this.ws.send(JSON.stringify({id, data}), err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  updatePlayerCount (count) {
    this.send('status.playercount', count)
  }

  acceptInvite (other) {
    const inviteIndex = this.invites.findIndex(invite => invite.inviter.toString() === other.toString())

    if (inviteIndex !== -1) {
      this.invites.splice(inviteIndex, 1)
      this.sendInviteUpdate()
      return true
    }
    return false
  }

  addInvite (inviter) {
    const invite = {
      inviter: inviter._id.toString(),
      username: inviter.username
    }
    this.invites.push(invite)

    setTimeout(() => this.removeInvite(invite), 1000 * 10)
    this.sendInviteUpdate()
  }

  sendInviteUpdate () {
    this.send('status.invites', this.invites)
  }

  removeInvite (invite) {
    const index = this.invites.indexOf(invite)
    if (index !== -1) {
      this.invites.splice(index, 1)
    }
    this.sendInviteUpdate()
  }
}
