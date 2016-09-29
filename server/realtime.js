import url from 'url'
import ServerPlayer from 'common/game/serverPlayer.js'
import RealtimePlayer from './realtime/realtimePlayer.js'
import { fightManager } from './fightManager.js'

export const players = []

function sendPlayerCount () {
  const count = players.length

  for (const player of players) {
    player.updatePlayerCount(count)
  }
}

export function acceptInvite (playerId, inviteId) {
  let inviteAccepted = false
  const playerRps = players.filter(realtimePlayer => realtimePlayer.player.id.equals(playerId))
  const otherRps = players.filter(rp => rp.player.id.equals(inviteId))

  if (!(playerRps.length > 0 && otherRps.length > 0)) {
    return
  }

  const invitedRealtimePlayers = []

  playerRps.forEach(invitedRealtimePlayer => {
    if (invitedRealtimePlayer.acceptInvite(inviteId)) {
      invitedRealtimePlayers.push(invitedRealtimePlayer)
      inviteAccepted = true
    }
  })

  if (inviteAccepted) {
    const RTPlayers = otherRps.concat(invitedRealtimePlayers)

    fightManager.startFight(RTPlayers.map(rt => rt.player)).then(fight => {
      players.forEach(player => {
        player.send('startgame', { id: fight.id })
      })

      fight.on('attack', attack => {
        players.forEach(player => {
          player.send('fight.attack', attack)
        })
      })
    }).catch(err => console.error(err.stack || err))
  }
}

export function invitePlayer (playerId, sourcePlayer) {
  players.filter(realtimePlayer => {
    return realtimePlayer.player.id.equals(playerId)
  }).forEach(realtimePlayer => {
    realtimePlayer.addInvite(sourcePlayer)
  })
}

export function sendMessage (playerId, messageId, data) {
  players.filter(realtimePlayer => {
    return realtimePlayer.player.id.equals(playerId)
  }).forEach(realtimePlayer => {
    realtimePlayer.send(messageId, data)
  })
}

export default function realtime (wss) {
  wss.on('connection', checkError(async ws => {
    const location = url.parse(ws.upgradeReq.url, true)
    const player = await ServerPlayer.fromKey(location.query.token)

    if (player) {
      const realtimePlayer = new RealtimePlayer(player, ws)
      realtimePlayer.send('status.auth', true)
      players.push(realtimePlayer)
      sendPlayerCount()

      ws.addEventListener('close', () => {
        players.splice(players.indexOf(realtimePlayer), 1)
        sendPlayerCount()
      })
    } else {
      ws.terminate()
    }
  }))
}

function checkError (cb) {
  return (...args) => {
    return Promise.resolve(cb(...args)).catch(err => console.error(err.stack || err))
  }
}
