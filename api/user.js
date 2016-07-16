const db = require('monk')('localhost/retardarenan')

const users = db.get('users')

const chars = 'ABCDEFGHIJKLMNOPQRSTUVXYabcdefghijklmnopqrstuvxyz0123456789'

function randomKey() {
  let key = ''
  for (var i = 0; i < 20; i++) {
    key += chars[Math.floor(Math.random() * chars.length)]
  }

  return key
}

module.exports.login = function * () {
  const username = this.request.body.username
  const password = this.request.body.password

  const user = yield users.findOne({ username, password })
  if (!user) {
    this.body = { success: false, error: 'Invalid details' }
    return
  }

  this.body = { success: true, key: user.key}
}

module.exports.register = function * () {
  const username = this.request.body.username
  const password = this.request.body.password

  const user = yield users.findOne({ username })
  if (user) {
    this.body = { success: false, error: 'Username taken' }
    return
  }

  const key = randomKey()

  yield users.insert({ username, password, key })
  this.body = { success: true }
}
