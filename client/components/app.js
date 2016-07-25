import React from 'react'
import { Link } from 'react-router'

export default class App extends React.Component {
  componentWillMount() {
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to='/'> Home</Link></li>
          <li><Link to='/login'> Login</Link></li>
          <li><Link to='/register'> Register</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
