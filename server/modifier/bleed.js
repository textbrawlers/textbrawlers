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
    fightData.playerStates[fightData.defenderIndex].buffs.filter(
      buff => buff.type === 'bleed').forEach(buff => {
        fightData.bleedDamage++
        if (buff.duration <= 0) {
          fightData.playerStates[fightData.defenderIndex].buffs.splice(index, 1)
        } else {
          fightData.playerStates[fightData.defenderIndex].buffs[index].duration--
        }
    })
  }
}
