export default {
  isType (weapon) {
    return weapon.type === 'hammer'
  },

  getText (weapon, round) {
    let result = []
    if (round.blocked) {
      result.push({
        chance: 100,
        text: '[attacker] battered [defender]\'s defences.'
      })
    } else if (round.crit) {
      result.push({
        chance: 100,
        text: '[attacker] battered [defender] and hit a critical spot.'
      })
    } else {
      result.push({
        chance: 100,
        text: '[attacker] battered [defender].'
      })
    }
    return result
  }
}
