import 'whatwg-fetch'

const request = {
  async send (method, url, params) {
    const resp = await window.fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        key: window.localStorage.getItem('key')
      },
      body: JSON.stringify(params)
    })

    return await resp.json()
  },

  get (url, params) {
    return request.send('GET', url, params)
  },

  post (url, params) {
    return request.send('POST', url, params)
  }
}

export default request

