import React from 'react'
import calculateNewElo from 'common/util/elo.js'

export default class extends React.Component {

  constructor () {
    super()

    this.state = {
      winnerELO: 1500,
      loserELO: 1500
    }
  }

  calculate () {
    const { winner, loser } = calculateNewElo(this.state.winnerELO, this.state.loserELO)
    return {
      newWinnerELO: winner,
      newLoserELO: loser
    }
  }

  updateWinnerELO (e) {
    this.setState({
      winnerELO: parseInt(e.target.value) || 0
    })
  }

  updateloserELO (e) {
    this.setState({
      loserELO: parseInt(e.target.value) || 0
    })
  }

  render () {

    const { newWinnerELO, newLoserELO } = this.calculate()
    return (
      <div>
        Winner ELO:
        <input type='text'
          value={this.state.winnerELO}
          onChange={this.updateWinnerELO.bind(this)} />

        Loser ELO:
        <input type='text'
          value={this.state.loserELO}
          onChange={this.updateloserELO.bind(this)} />
        <hr />
        New winner ELO: {newWinnerELO}
        <br />
        New loser ELO: {newLoserELO}

      </div>
    )
  }
}
