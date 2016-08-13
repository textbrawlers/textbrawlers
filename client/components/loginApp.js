import React from 'react'
import { Link } from 'react-router'
import LoginPage from './loginPage.js'
import RegisterPage from './registerPage.js'

export default class extends React.Component {
  componentWillMount () {
    this.forceUpdate()
  }

  render () {
    return (
      <div>
        <div className='containerlogin'>
          <div className='window login-window'>
            <h2>Login</h2>
            <div className='windowcontent'>
              <LoginPage />
            </div>
          </div>
          <div className='window register-window'>
            <h2>Register</h2>
            <div className='windowcontent'>
              <RegisterPage />
            </div>
          </div>
          <div className='window guest-window'>
            <h2>Play as Guest</h2>
          </div>
        </div>
      </div>
    )
  }
}
