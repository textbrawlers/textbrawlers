import modifiers from './modifier/config.js'

export default {
  apply (fightData) {
    modifiers.forEach(modifier => {
      fightData = modifier.apply(fightData)
    })
    return fightData
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
