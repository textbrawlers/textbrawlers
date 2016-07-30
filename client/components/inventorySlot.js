import React from 'react'

export default class extends React.Component {

  render() {
    let specialClass = ''
    if (this.props.special) {
      specialClass = ` inv-${this.props.special}`
    }
    return (
      <div className={`inv-slot${specialClass}`}  style={this.props.style} data-slot={this.props.slot}>
        {this.props.children}
      </div>
    )
  }
}
