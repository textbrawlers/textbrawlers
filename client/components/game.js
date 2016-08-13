import React, { Component } from 'react'

export default class Game extends Component {
  render () {
    return <div>
             {this.props.children}
           </div>
  }
}
