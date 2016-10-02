import modifiers from './modifier/config.js'

export default {
  apply (fightData) {
    modifiers.forEach(modifier => {
      if (modifier.apply) {
        fightData = modifier.apply(fightData)
      }
    })
    return fightData
  },

  init (fightData) {
    modifiers.forEach(modifier => {
      if (modifier.init) {
        fightData = modifier.init(fightData)
      }
    })
    return fightData
  },

  tick (fightData) {
    modifiers.forEach(modifier => {
      if (modifier.tick) {
        fightData = modifier.tick(fightData)
      }
    })
    return fightData
  }
}
