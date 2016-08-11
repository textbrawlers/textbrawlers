import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
  componentWillMount() {
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        <div className="containerlogin">
          <div className="window signin-window">
            <h2>Sign In</h2>
          </div>
          <div className="window signup-window">
            <h2>Sign Up</h2>
          </div>
          <div className="window guest-window">
            <h2>Play as Guest</h2>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
}
