import url from 'url'
import ServerPlayer from 'common/game/serverPlayer.js'

export default function realtime (wss) {
  wss.on('connection', checkError(async ws => {
    const location = url.parse(ws.upgradeReq.url, true)

    console.log('authenticating', location.query.token)
    const player = await ServerPlayer.fromKey(location.query.token)

    if (player) {
      console.log('Connected to realtime')
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
