import url from 'url'
import ServerPlayer from 'common/game/serverPlayer.js'
import RealtimePlayer from './realtime/realtimePlayer.js'

export const players = []

function sendPlayerCount () {
  const count = players.length

  for (const player of players) {
    player.updatePlayerCount(count)
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
    return Promise.resolve(cb(...args)).catch(err => console.error(err))
  }
}
