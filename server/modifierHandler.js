import modifiers from './modifier/config.js'

export default {
  apply (fightData) {
<<<<<<< HEAD
    modifiers.forEach(modifier => {
      fightData = modifier.apply(fightData)
    })
    return fightData
  },

  attackInit (fightData) {

  },

=======
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

>>>>>>> a3beb3a16769452a5ee6a62464999d92a5d63435
  tick (fightData) {
    let resp = []
    modifiers.forEach(modifier => {
      resp.push(modifier.tick())
    })
    return resp
  }
}
