import modifiers from './modifier/config.js'

const modifierHandler = {
  func (fightData, prop) {
    modifiers.filter(m => m[prop]).forEach(modifier => {
      fightData = modifier[prop](fightData)
    })
    return fightData
  },

  textFunc (textData, prop) {
    let texts = []
    modifiers.filter(m => m[prop]).forEach(modifier => {
      const resp = modifier[prop](textData)
      if (resp) {
        resp.forEach(textObj => {
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
    return texts
  }
}

export default modifierHandler
