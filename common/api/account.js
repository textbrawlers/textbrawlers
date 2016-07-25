import request from './request.js'

export default {
  login(username, password) {
    return request.post('/api/user/login', {
      username, password
    })
  }
}
