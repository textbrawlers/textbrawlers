import React from 'react'
import { browserHistory } from 'react-router'
import AccountAPI from 'common/api/account.js'

export default class LoginPage extends React.Component {

  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor='username'>
            Username:
          </label>
          <br />
          <input
            className='input'
            type='text'
            id='username'
            value={this.state.username}
            onChange={this.updateUsername.bind(this)} />
          <br />
          <label htmlFor='password'>
            Password:
          </label>
          <br />
          <input
            className='input'
            type='password'
            id='password'
            value={this.state.password}
<<<<<<< HEAD
            onChange={this.updatePassword.bind(this)} /><br />
          <div className="login-button-center">
          <input
            className="login-button"
            type="submit"
            value="Login" />
=======
            onChange={this.updatePassword.bind(this)} />
          <br />
          <div className='login-button-center'>
            <input className='login-button' type='submit' value='Login' />
>>>>>>> origin/master
          </div>
        </form>
      </div>
    )
  }

  updateUsername (e) {
    this.setState(Object.assign(this.state, {
      username: e.target.value
    }))
  }

  updatePassword (e) {
    this.setState(Object.assign(this.state, {
      password: e.target.value
    }))
  }

  async onSubmit (e) {
    e.preventDefault()

    const response = await AccountAPI.login(this.state.username, this.state.password)

    if (response.json.success) {
      browserHistory.push('/game')
    } else {
      window.alert(`Could not login: ${response.json.error}`)
    }
  }

}
