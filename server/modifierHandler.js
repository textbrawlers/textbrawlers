import modifiers from './modifier/config.js'

export default {
  apply (fightData) {
    let resp = {}
    let index = 0
    modifiers.forEach(modifier => {
      fightData.id = Math.random()
      fightData.index = index
      let mod = modifier.apply(fightData)

      fightData.damage = mod.damage
      Object.assign(resp, mod)
      index++
    })
    return resp
  },

  attackInit (fightData) {

  },

  tick (fightData) {
    let resp = []
    modifiers.forEach(modifier => {
      resp.push(modifier.tick())
    })
    return resp
  }
}
