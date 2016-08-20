
export default class RealtimePlayer {
  constructor (player, ws) {
    this.player = player
    this.ws = ws

    this.invites = []
  }

  send (id, data) {
    this.ws.send(JSON.stringify({id, data}))
  }

  updatePlayerCount (count) {
    this.send('status.playercount', count)
  }

  acceptInvite (other) {
    const inviteIndex = this.invites.findIndex(invite => invite.inviter.toString() === other.toString())

    console.log(inviteIndex)

    if (inviteIndex !== -1) {
      this.invites.splice(inviteIndex, 1)
      this.sendInviteUpdate()
      this.send('startgame')
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
