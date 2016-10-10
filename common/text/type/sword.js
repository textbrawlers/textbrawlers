export default {
  isType (weapon) {
    return weapon.type === 'sword'
  },

  getText (weapon, round) {
    let result = []
    if (round.blocked) {
      result.push({
        chance: 100,
        text: '[attacker] sliced at [defender]\'s defences.'
      })
    } else if (round.crit) {
      result.push({
        chance: 100,
        text: '[attacker] sliced [defender] and hit a critical spot.'
      })
    } else {
      result.push({
        chance: 100,
        text: '[attacker] sliced [defender].'
      })
    }
    return result
  }
}
