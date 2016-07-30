import 'whatwg-fetch';

const request = {
  async send(method, url, params) {
    const resp = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        key: localStorage.getItem('key')
      },
      body: JSON.stringify(params)
    })

    resp.json = await resp.json()

    return resp
  },

  get(url, params) {
    return request.send('GET', url, params)
  },

  post(url, params) {
    return request.send('POST', url, params)
  }
}

export default request
