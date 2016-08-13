import React from 'react'
import { Link } from 'react-router'
import LoginPage from './loginPage.js'
import RegisterPage from './registerPage.js'
import 'client/css/homepage.scss'

export default class extends React.Component {
  componentWillMount () {
    this.forceUpdate()
  }

  render () {
    return (
      <div>
        <div>
          <div className='links'>
            <div className='leftlinks'>
              <Link to='/'>
                <img src='/client/png/inventory.png' />
              </Link>
            </div>
            <div className='middlelinks'>
              <Link to='/'>
                <img className='title' src='/client/png/title.png' />
              </Link>
            </div>
            <div className='rightlinks'>
              <Link to='/'>
                <img src='/client/png/inventory.png' />
              </Link>
            </div>
          </div>
        </div>
        <div className='page-homepage'>
          <div className='container-login'>
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
      </div>
    )
  }
}
