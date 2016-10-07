import modifiers from './modifier/config.js'

export default {
  apply (fightData) {
    modifiers.filter(m => m.apply).forEach(modifier => {
      fightData = modifier.apply(fightData)
      if (!fightData) {
        console.warn('FightData is undefined. Did you remember to return?')
      }
    })
    return fightData
  },

  weaponChange (fightData) {
    modifiers.filter(m => m.weaponChange).forEach(modifier => {
      fightData = modifier.weaponChange(fightData)
      if (!fightData) {
        console.warn('FightData is undefined. Did you remember to return?')
      }
    })
    return fightData
  },

  init (fightData) {
    modifiers.filter(m => m.init).forEach(modifier => {
      fightData = modifier.init(fightData)
      if (!fightData) {
        console.warn('FightData is undefined. Did you remember to return?')
      }
    })
    return fightData
  },

  tick (fightData) {
    modifiers.filter(m => m.tick).forEach(modifier => {
      fightData = modifier.tick(fightData)
      if (!fightData) {
        console.warn('FightData is undefined. Did you remember to return?')
      }
    })
    return fightData
  },

  end (fightData) {
    modifiers.filter(m => m.end).forEach(modifier => {
      fightData = modifier.end(fightData)
      if (!fightData) {
        console.warn('FightData is undefined. Did you remember to return?')
      }
    })
    return fightData
  },

  deathText (textData) {
    let textToAdd = []
    modifiers.filter(m => m.deathText).forEach(modifier => {
      let textObj = modifier.deathText(textData)
      if (textObj) {
        textToAdd.push(textObj)
      }
    })
    return textToAdd
  }
}
