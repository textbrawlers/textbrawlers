export default {
  isType (weapon) {
    return weapon.type === 'bow'
  },

  getText (weapon, round) {
    let result = []
    if (round.blocked) {
      result.push({
        chance: 100,
        text: '[attacker] fired an arrow at [defender] but [defender] blocked it.'
      })
    } else if (round.crit) {
      result.push({
        chance: 100,
        text: '[attacker] fired an arrow at [defender] which hit a critical spot.'
      })
      result.push({
        chance: 1,
        text: '[defender] took an arrow to the knee.'
      })
    } else {
      result.push({
        chance: 100,
        text: '[attacker] fired an arrow at [defender] which hit.'
      })
    }
    return result
  }
}
