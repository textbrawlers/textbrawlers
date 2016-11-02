import modifiers from './modifier/config.js'
import _ from 'lodash'

const modifierHandler = {
  apply (fightData) {
    modifiers.filter(m => m.apply).forEach(modifier => {
      const oldData = _.cloneDeep(fightData)
      fightData = modifier.apply(fightData)
      modifierHandler.checkData(oldData, fightData, modifier)
    })
    return fightData
  },

  weaponChange (fightData) {
    modifiers.filter(m => m.weaponChange).forEach(modifier => {
      const oldData = _.cloneDeep(fightData)
      fightData = modifier.weaponChange(fightData)
      modifierHandler.checkData(oldData, fightData, modifier)
    })
    return fightData
  },

  init (fightData) {
    modifiers.filter(m => m.init).forEach(modifier => {
      const oldData = _.cloneDeep(fightData)
      fightData = modifier.init(fightData)
      modifierHandler.checkData(oldData, fightData, modifier)
    })
    return fightData
  },

  tick (fightData) {
    modifiers.filter(m => m.tick).forEach(modifier => {
      const oldData = _.cloneDeep(fightData)
      fightData = modifier.tick(fightData)
      modifierHandler.checkData(oldData, fightData, modifier)
    })
    return fightData
  },

  end (fightData) {
    modifiers.filter(m => m.end).forEach(modifier => {
      const oldData = _.cloneDeep(fightData)
      fightData = modifier.end(fightData)
      modifierHandler.checkData(oldData, fightData, modifier)
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

  checkData (oldData, newData, modifier) {
    if (!newData) {
      console.warn('@' + modifier.name + ': FightData is undefined. Did you remember to return?')
    } else {
      Object.entries(oldData).forEach(([oKey, oValue]) => Object.entries(newData).forEach(([nKey, nValue]) => {
        if (oKey === nKey && oValue !== nValue) {
          console.warn('@' + modifier.name + ': Variable ' + oKey.toString() + ' has changed from ' + oValue + ' to ' + nValue + '.')
        }
      }))
      if (!newData.weapons[newData.currentWeapon]) {
        console.warn('@' + modifier.name + ': Weapon at current index is undefined.')
      }
      if (newData.damage < 0 || newData.damage > 2000) {
        console.warn('@' + modifier.name + ': Damage has an unexpected value: ' + newData.damage)
      }
    }
  }
}

export default modifierHandler
