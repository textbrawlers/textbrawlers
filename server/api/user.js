import bCrypt from 'bcryptjs'
import db from 'server/common/database.js'

const users = db.get('users')

const chars = 'ABCDEFGHIJKLMNOPQRSTUVXYabcdefghijklmnopqrstuvxyz0123456789'

function randomKey() {
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

function compare(password, userPassword) {
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

export async function login(ctx) {
  const username = ctx.request.body.username
  const password = ctx.request.body.password

  const user = await users.findOne({ username })
  ctx.body = {}
  if (!user) {
    ctx.body = {
      errors: [
        {
          field: 'username',
          message: 'This username does not exist',
        },
      ],
    }
    return
  }

  const match = await compare(password, user.hashedpw)

  if (!match) {
    ctx.body = {
      errors: [{ field: 'password', message: 'Wrong password' }],
    }
    return
  }

  ctx.body = {
    key: user.key,
    user: {
      username: user.username,
    },
  }
}

export async function register(ctx) {
  const username = ctx.request.body.username
  const password = ctx.request.body.password

  let salt = await genSalt(10)
  let hashedpw = await hash(password, salt)

  const user = await users.findOne({ username })
  if (user) {
    ctx.body = {
      errors: [{ field: 'username', message: 'Username already taken' }],
    }
    return
  }

  const key = randomKey()

  await users.insert({ username, hashedpw, key })
  ctx.body = {
    key,
    user: {
      username,
    },
  }
}

export async function checkKey(ctx) {
  const { key, username } = ctx.account
  ctx.body = {
    key,
    user: {
      username: username,
    },
  }
}

export async function getPlayer(ctx) {
  ctx.body = ctx.player.serialize()
}
