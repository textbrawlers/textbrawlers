import modifiers from './modifier/config.js'

export default {
  apply (fightData) {
    modifiers.forEach(modifier => {
      fightData = modifier.apply(fightData)
    })
    return fightData
  },

  init (fightData) {
    modifiers.forEach(modifier => {
      fightData = modifier.init(fightData)
    })
    return fightData
  },

  tick (fightData) {
    modifiers.forEach(modifier => {
      fightData = modifier.tick(fightData)
    })
    return fightData
  }
}
