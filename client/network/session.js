/* global localStorage */
import request from 'client/network/request.js'
import { setUser } from 'client/store/actions.js'

export function storeKey (key) {
  localStorage.setItem('key', key)
}

export function getKey () {
  return localStorage.getItem('key')
}

export async function tryRestoreSession (store) {
  const key = getKey()

  if (!key) {
    return
  }

  let user
  try {
    ;({ user } = await request.post('/api/user/checkKey', { key }))
  } catch (err) {
    storeKey(null)
    return
  }

  user.key = user
  store.dispatch(setUser(user))
}

