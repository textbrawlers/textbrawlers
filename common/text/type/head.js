export default {
  isType (weapon) {
    return weapon.type === 'head'
  },

  fightText (round) {
    let result = []
    if (round.missed) {
      result.push({
        chance: 100,
        text: '[attacker] threw his helmet at [defender] but missed. What an idiot.'
      })
      result.push({
        chance: 1,
        text: '[attacker] missed...'
      })
    } else if (round.blocked) {
      result.push({
        chance: 100,
        text: '[attacker] threw his helmet at [defender] but [defender] caught it in mid-air.'
      })
      result.push({
        chance: 10,
        text: '[attacker] flailed wildly at [defender] and got blocked, to no one\'s suprise.'
      })
    } else if (round.crit) {
      result.push({
        chance: 100,
        text: '[attacker] threw his helmet at [defender] and hit a weak spot, somehow.'
      })
      result.push({
        chance: 10,
        text: '[attacker] takes of his [item-name] and proceeds to clobber [defender] senseless with it!'
      })
    } else {
      result.push({
        chance: 100,
        text: '[attacker] threw his [item-name] and hit [defender] in the face.'
      })
      result.push({
        chance: 50,
        text: '[defender] suddenly got an arrow in his back. Who did that?'
      })
      result.push({
        chance: 30,
        text: '[attacker] headbutted [defender] in the stomach.'
      })
    }
    return result
  },

  deathText (round) {
    let result = []
    result.push({
      chance: 50,
      text: '[defender] could no longer bear the embarrassment of being beaten by a helmet, and committed suicide.'
    })
    return result
  }
}
