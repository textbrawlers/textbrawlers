import modifiers from './modifier/config.js'

const modifierHandler = {
  apply (fightData) {
    modifiers.filter(m => m.apply).forEach(modifier => {
      fightData = modifier.apply(fightData)
    })
    return fightData
  },

  weaponChange (fightData) {
    modifiers.filter(m => m.weaponChange).forEach(modifier => {
      fightData = modifier.weaponChange(fightData)
    })
    return fightData
  },

  init (fightData) {
    modifiers.filter(m => m.init).forEach(modifier => {
      fightData = modifier.init(fightData)
    })
    return fightData
  },

  tick (fightData) {
    modifiers.filter(m => m.tick).forEach(modifier => {
      fightData = modifier.tick(fightData)
    })
    return fightData
  },

  end (fightData) {
    modifiers.filter(m => m.end).forEach(modifier => {
      fightData = modifier.end(fightData)
    })
    return fightData
  },

  newTurn (fightData) {
    modifiers.filter(m => m.newTurn).forEach(modifier => {
      fightData = modifier.newTurn(fightData)
    })
    return fightData
  },

  deathText (textData) {
    let texts = []
    modifiers.filter(m => m.deathText).forEach(modifier => {
      let textObjects = modifier.deathText(textData)
      if (textObjects) {
        textObjects.forEach(textObj => {
          texts.push(textObj)
        })
      }
    })
    return texts
  },

  fightText (textData) {
    let texts = []
    modifiers.filter(m => m.fightText).forEach(modifier => {
      let textObjects = modifier.fightText(textData)
      if (textObjects) {
        textObjects.forEach(textObj => {
          texts.push(textObj)
        })
      }
    })
    return texts
  },

  turnText (textData) {
    let texts = []
    modifiers.filter(m => m.turnText).forEach(modifier => {
      const resp = modifier.turnText(textData)
      if (resp) {
        texts.push(resp)
      }
    })
    if (texts.length === 0) {
      texts.push('[attacker]\'s turn has begun.')
    }
    const i = Math.random() * texts.length
    console.log(texts)
    const text = texts[i] ? texts[i] : texts[0]
    console.log(text)
    return text
  }
}

export default modifierHandler
