import React, { Component } from 'react'

export default class BuffBar extends Component {
  render () {
    return <pre>{JSON.stringify(this.props.buffs, undefined, 2)}</pre>
  }
}
