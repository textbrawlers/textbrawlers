import modifiers from './modifier/config.js'

export default {
  apply (fightData) {
    modifiers.forEach(modifier => {
      if (modifier.apply) {
        fightData = modifier.apply(fightData)
      }
      if (!fightData) {
        console.warn('FightData is undefined. Did you remember to return?')
      }
    })
    return fightData
  },

  init (fightData) {
    modifiers.forEach(modifier => {
      if (modifier.init) {
        fightData = modifier.init(fightData)
      }
      if (!fightData) {
        console.warn('FightData is undefined. Did you remember to return?')
      }
    })
    return fightData
  },

  tick (fightData) {
    modifiers.forEach(modifier => {
      if (modifier.tick) {
        fightData = modifier.tick(fightData)
      }
      if (!fightData) {
        console.warn('FightData is undefined. Did you remember to return?')
      }
    })
    return fightData
  }
}
