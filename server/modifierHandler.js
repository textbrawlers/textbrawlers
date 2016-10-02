import modifiers from './modifier/config.js'

export default {
  apply (fightData) {
    let resp = {}
    let i = 0
    modifiers.forEach(modifier => {
      fightData.i = i
      let mod = modifier.apply(fightData)

      fightData.damage = mod.damage
      Object.assign(resp, mod)
      i++
    }
    return resp
  },

  attackInit(fightData){

  },

  tick(fightData){
    let resp = []
    modifiers.forEach(modifier => {
      resp.push(modifier.tick())
    })
    return resp
  }
}
