import React, { Component } from 'react'

export default class Fight extends Component {

  constructor () {
    super()

    this.state = {
      attacks: []
    }
  }

  componentWillMount () {
    this.props.realtime.on('message-fight.attack', attack => {
      this.setState({
        attacks: this.state.attacks.concat(attack)
      })
    })
  }

  render () {
    const attacks = this.state.attacks.map(attack => {
      return (
        <pre>{JSON.stringify(attack)}</pre>
      )
    })
    return (
      <div>
        <h2>Fight!</h2>
        {attacks}
      </div>
    )
  }

}
