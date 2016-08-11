import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
  componentWillMount() {
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        <div className="window login-window">
          <h2>Sign In</h2>
        </div>
        {this.props.children}
      </div>
    )
  }
}
