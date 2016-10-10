export default {
  isType (weapon) {
    return weapon.type === 'magical'
  },

  getText (weapon, round) {
    let result = []
    if (round.blocked) {
      result.push({
        chance: 100,
        text: '[attacker] fired a spell at [defender]\'s defences.'
      })
    } else if (round.crit) {
      result.push({
        chance: 100,
        text: '[attacker] fired a spell at [defender] and hit a critical spot.'
      })
    } else {
      result.push({
        chance: 100,
        text: '[attacker] fired a spell at [defender].'
      })
    }
    return result
  },

  deathText (weapon, round) {
    let result = []
    result.push({
      chance: 50,
      text: '[defender] was promptly turned into a bubbling pool of flesh.'
    })
    return result
  }
}
