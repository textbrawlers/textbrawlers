import url from 'url'
import ServerPlayer from 'common/game/serverPlayer.js'
import RealtimePlayer from './realtime/realtimePlayer.js'
import { fightManager } from './fightManager.js'
import isEqual from 'lodash/isEqual'

export const players = []

function updatePlayers () {
  const count = players.length

  const playerIds = players.map(rtPlayer => rtPlayer.player.id.toString())

  for (const player of players) {
    player.updatePlayerCount(count)

    player.account = player.account || {}
    player.account.social = player.account.social || {}
    player.account.social.friends = player.account.social.friends || []
    player.account.friends = player.account.friends || {}

    const friends = player.account.social.friends.map(friend => friend._id.toString())

    const onlineFriends = playerIds.filter(id => friends.indexOf(id) !== -1)

    if (!isEqual(onlineFriends, player.onlineFriends)) {
      player.updateFriendList(onlineFriends)
    }
  }
}

export function getRealtimePlayer (player) {
  return players.find(rtPlayer => rtPlayer.player.id.equals(player.id))
}

export function getFight (id) {
  return fightManager.get(id)
}

export function startNPCFight (playerId, npc, npcLevel) {
  const rtPlayers = players.filter(realtimePlayer => realtimePlayer.player.id.equals(playerId))

  refreshPlayers(rtPlayers).then(() => {
    return fightManager.startFight(rtPlayers.map(rt => rt.player).concat(npc))
  }).then(fight => {
    fight.level = npcLevel
    rtPlayers.forEach(rtPlayer => {
      sendMessage(rtPlayer.player.id, 'startgame', { id: fight.id })
    })

    fight.on('attack', attack => {
      fight.subscribers.forEach(player => {
        attack.fightId = fight.id
        sendMessage(player.id, 'fight.attack', attack)
      })
    })
  })
}

function refreshPlayers (rtPlayers) {
  return Promise.all(rtPlayers.map(rtPlayer => {
    return ServerPlayer.fromId(rtPlayer.player.id).then(player => {
      if (player) {
        rtPlayer.player = player
      } else {
        console.warn('Could not refresh RealtimePlayer.player', rtPlayer.player.id)
      }
    })
  }))
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
    const rtPlayers = otherRps.concat(invitedRealtimePlayers)

    refreshPlayers(rtPlayers).then(() => {
      return fightManager.startFight(rtPlayers.map(rt => rt.player))
    }).then(fight => {
      fight.players.forEach(player => {
        sendMessage(player.id, 'startgame', { id: fight.id })
      })

      fight.on('attack', attack => {
        fight.subscribers.forEach(player => {
          attack.fightId = fight.id
          sendMessage(player.id, 'fight.attack', attack)
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
    const { player, jsonUser } = await ServerPlayer.fromKey(location.query.token, true)

    if (player) {
      const realtimePlayer = new RealtimePlayer(player, ws, jsonUser)
      realtimePlayer.send('status.auth', true)

      players.filter(rtp => rtp.player.id.equals(player.id)).forEach(playerToDisconnect => {
        playerToDisconnect.ws.close()
        const index = players.indexOf(playerToDisconnect)
        players.splice(index, 1)
      })

      players.push(realtimePlayer)
      updatePlayers()

      ws.addEventListener('close', () => {
        players.splice(players.indexOf(realtimePlayer), 1)
        updatePlayers()
      })
    } else {
      ws.close()
    }
  }))
}

function checkError (cb) {
  return (...args) => {
    return Promise.resolve(cb(...args)).catch(err => console.error(err.stack || err))
  }
}
