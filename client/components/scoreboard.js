import React, { Component } from 'react'
import request from 'common/api/request.js'

export default class ItemDetails extends Component {

  constructor () {
    super()

    this.state = {
      pvpScoreboard: [],
      npcScoreboard: []
    }
  }

  componentWillMount () {
    request.get('/api/game/scoreboard/pvp').then(resp => {
      this.setState({ pvpScoreboard: resp.json.scoreboard })
    })

    request.get('/api/game/scoreboard/npcdiff').then(resp => {
      this.setState({ npcScoreboard: resp.json.scoreboard })
    })
  }

  render () {
    return (
      <div>
        <h2>NPC</h2>
        <table>
          {this.state.npcScoreboard.map(account => {
            return (<tr><td>{account.username}</td><td>{account.npcDifficulty}</td></tr>)
          })}
        </table>
        <h2>PVP</h2>
        <table>
          {this.state.pvpScoreboard.map(account => {
            return (<tr><td>{account.username}</td><td>{account.pvpRank}</td></tr>)
          })}
        </table>
      </div>
    )
  }
}
