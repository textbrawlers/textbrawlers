import request from './request.js'

export default {
  async login(username, password) {
    const resp = await request.post('/api/user/login', {
    username, password})

    if (resp.json.success) {
      localStorage.setItem('key', resp.json.key)
    }

    return resp
  },

  register(username, password) {
    return request.post('/api/user/register', {
    username, password})
  },

  get() {
    return request.get('/api/user/get')
  }
}
