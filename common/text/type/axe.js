export default {
  isType (weapon) {
    return weapon.type === 'axe'
  },

  getText (weapon, round) {
    let result = []
    if (round.blocked) {
      result.push({
        chance: 100,
        text: '[attacker] chopped at [defender]\'s defences.'
      })
    } else if (round.crit) {
      result.push({
        chance: 100,
        text: '[attacker] chopped [defender] and hit a critical spot.'
      })
    } else {
      result.push({
        chance: 100,
        text: '[attacker] chopped [defender].'
      })
    }
    return result
  }
}
