import Monk from 'monk'
import bCrypt from 'bcryptjs'

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

function genSalt(work) {
  return new Promise((resolve, reject) => {
    bCrypt.genSalt(work, (err, salt) => {
      if (err) {
        reject(err)
      } else {
        resolve(salt)
      }
    })
  })
}

function hash(pw, salt) {
  return new Promise((resolve, reject) => {
    bCrypt.hash(pw, salt, (err, hash) => {
      if (err) {
        reject(err)
      } else {
        resolve(hash)
      }
    })
  })
}

function compare(password, userPassword){
  return new Promise((resolve, reject) => {
    bCrypt.compare(password, userPassword, (err, match) => {
      if (err) {
        reject(err)
      } else {
        resolve(match)
      }
    })
  })
}

export async function login (ctx) {
  const username = ctx.request.body.username
  const password = ctx.request.body.password

  const user = await users.findOne({username})
  if (!user) {
    ctx.body = { success: false, error: 'Invalid details' }
    return
  }

  const match = await compare(password, user.hashedpw)

  if (!match){
    ctx.body = { success: false, error: 'Invalid details' }
    return
  }

  ctx.body = { success: true, key: user.key }
}

export async function register (ctx) {
  const username = ctx.request.body.username
  const password = ctx.request.body.password

  let salt = await genSalt(10)
  let hashedpw = await hash(password, salt)

  const user = await users.findOne({username})
  if (user) {
    ctx.body = { success: false, error: 'Username taken' }
    return
  }

  const key = randomKey()

  await users.insert({username, hashedpw, key})
  ctx.body = { success: true }
}

export async function getPlayer (ctx) {
  console.log('get player')
  ctx.body = ctx.player.serialize()
}

