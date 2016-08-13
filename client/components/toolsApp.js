import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
  componentWillMount () {
    this.forceUpdate()
  }

  render () {
    return (
      <div>
        <ul>
          <li>
            <Link to='/tools/itembrowser'> Item Browser
            </Link>
          </li>
          <li>
            <Link to='/tools/itemgen'> Item Gen
            </Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
