import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
  componentWillMount() {
    this.forceUpdate()
  }

  render() {
    return (
      <div className="outline">
        asdadasd
        {this.props.children}
        asdsadas
      </div>
    )
  }
}
