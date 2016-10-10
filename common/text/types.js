import typeList from './type/list.js'

export default {
  getText (m, weapon, round) {
    typeList.filter(t => t.isType(weapon) && t.getText).forEach(type => {
      type.getText(weapon, round).forEach(textObj => {
        m.add(textObj.chance, textObj.text)
      })
    })
  },

  deathText (m, weapon, round) {
    typeList.filter(t => t.isType(weapon) && t.deathText).forEach(type => {
      type.deathText(weapon, round).forEach(textObj => {
        m.add(textObj.chance, textObj.text)
      })
    })
  }
}
