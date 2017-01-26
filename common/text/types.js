import typeList from './type/list.js'

export default {
  textFunc (m, weapon, round, prop) {
    typeList.filter(t => t.isType(weapon) && t[prop]).forEach(type => {
      type[prop](round).forEach(textObj => {
        m.add(textObj.chance, textObj.text)
      })
    })
  }
}
