import modifiers from './modifier/config.js'

export default {
  apply (fightData) {
    let resp = {}
    modifiers.forEach(modifier => {
      let mod = modifier.apply(fightData)

      resp.damage = mod.damage
      if (mod.blocked) {
        resp.blocked = mod.blocked
      }
      if (mod.crits) {
        resp.crits = mod.crits
      }
      if (mod.crits) {
        resp.arcaneDamage = mod.arcaneDamage
      }
    })
    return resp
  },

  tick (fightData) {
    let resp = []
    modifiers.forEach(modifier => {
      resp.push(modifier.tick())
    })
    return resp
  }
}
