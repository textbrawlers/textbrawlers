import React from 'react'
import { Link, browserHistory } from 'react-router'
import AccountAPI from 'common/api/account.js'

export default class RegisterPage extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="username">Username:</label><br />
          <input
            className="input"
            type="text"
            id="username"
            value={this.state.username}
            onChange={this.updateUsername.bind(this)} /><br />
          <label htmlFor="password">Password:</label><br />
          <input
            className="input"
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.updatePassword.bind(this)} /><br />
          <div className="login-button-center"> 
          <input
            className="login-button"
            type="submit"
            value="Register" />
          </div>
        </form>
      </div>
    )
  }

  updateUsername(e) {
    this.setState(Object.assign(this.state, {
      username: e.target.value
    }))
  }

  updatePassword(e) {
    this.setState(Object.assign(this.state, {
      password: e.target.value
    }))
  }

  async onSubmit(e) {
    e.preventDefault()

    const response = await AccountAPI.register(this.state.username, this.state.password)

    if (response.json.success) {
      browserHistory.push('/login')
    } else {
      alert(`Could not create account: ${response.json.error}`)
    }
  }

}
