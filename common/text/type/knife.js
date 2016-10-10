export default {
  isType (weapon) {
    return weapon.type === 'knife'
  },

  getText (weapon, round) {
    let result = []
    if (round.blocked) {
      result.push({
        chance: 100,
        text: '[attacker] stabbed at [defender]\'s defences.'
      })
    } else if (round.crit) {
      result.push({
        chance: 100,
        text: '[attacker] stabbed [defender] and hit a critical spot.'
      })
      result.push({
        chance: 20,
        text: '[attacker] stabbed [defender] in the back. What a coward.'
      })
    } else {
      result.push({
        chance: 100,
        text: '[attacker] stabbed [defender].'
      })
    }
    return result
  }
}
