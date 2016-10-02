export default {
  apply (fightData) {
    const defender = fightData.defenderIndex
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (Math.random() <= weapon.stats.getValue('bleed-chance')) {
      let bleedStack = {
        type: 'bleed',
        duration: weapon.stats.getValue('bleed-duration')
      }
      fightData.playerStates[defender].buffs.push(bleedStack)
    }
    return fightData
  },

  tick (fightData) {
    fightData.dots.bleedDamage = 0
    const ps = fightData.playerStates[fightData.defenderIndex]
    ps.buffs = ps.buffs.filter(buff => !(buff.type === 'bleed' && buff.duration <= 0))
    ps.buffs.filter(buff => buff.type === 'bleed').forEach(buff => {
      fightData.dots.bleedDamage++
      buff.duration--
    })
    return fightData
  }
}
