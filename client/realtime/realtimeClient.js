import EventEmitter from 'events'

export default class RealtimeClient extends EventEmitter {
  constructor () {
    super()

    this.active = true
    this.playerCount = -1
    this.connect()
  }

  get state () {
    return {
      connected: this.connected,
      playerCount: this.playerCount
    }
  }

  emitChange () {
    if (this.active) {
      this.emit('change')
    }
  }

  setPlayercount (playerCount) {
    this.playerCount = playerCount
    this.emitChange()
  }

  setConnected (connected) {
    console.log('WS Connected: ' + connected)
    this.connected = connected

    if (!connected) {
      this.playerCount = -1
    }
    this.emitChange()
  }

  close () {
    this.active = false
    this.socket.close()
  }

  connect () {
    if (this.socket) {
      this.socket.close()
    }

    const host = document.location.host.replace(/:.*/, '')
    const port = document.location.port
    const token = window.localStorage.getItem('key')
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss'

    this.socket = new window.WebSocket(`${protocol}://${host}:${port}/?token=${token}`)

    this.socket.addEventListener('open', this.onOpen.bind(this))
    this.socket.addEventListener('close', this.onClose.bind(this))
    this.socket.addEventListener('message', this.onMessage.bind(this))
    this.socket.addEventListener('error', this.onError.bind(this))
  }

  onOpen () {
    this.setConnected(true)
  }

  onClose () {
    this.setConnected(false)
  }

  onMessage (e) {
    const message = JSON.parse(e.data)
    console.log('message', message)

    if (message.id === 'status.playercount') {
      this.setPlayercount(message.data)
    }

    this.emit('message-' + message.id, message.data)
  }

  onError (e) {
    console.error('WebSocket error', e)
  }
}
