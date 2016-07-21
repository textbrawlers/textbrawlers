import Monk from 'monk'

const db = new Monk(process.env.MONGODB || 'localhost/retardarenan')
const users = db.get('users')

const chars = 'ABCDEFGHIJKLMNOPQRSTUVXYabcdefghijklmnopqrstuvxyz0123456789'

function randomKey () {
  let key = ''
  for (var i = 0; i < 20; i++) {
    key += chars[Math.floor(Math.random() * chars.length)]
  }

  return key
}

export async function login (ctx) {
  const username = ctx.request.body.username
  const password = ctx.request.body.password

  const user = await users.findOne({username, password})
  if (!user) {
    ctx.body = { success: false, error: 'Invalid details' }
    return
  }

  ctx.body = { success: true, key: user.key }
}

export async function register (ctx) {
  const username = ctx.request.body.username
  const password = ctx.request.body.password

  const user = await users.findOne({username})
  if (user) {
    ctx.body = { success: false, error: 'Username taken' }
    return
  }

  const key = randomKey()

  await users.insert({username, password, key})
  ctx.body = { success: true }
}

