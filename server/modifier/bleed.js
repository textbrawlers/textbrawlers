export default {
  apply (fightData) {
    const defender = fightData.defenderIndex
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (Math.random() <= weapon.stats.getValue('bleed-chance')) {
      let bleedStack = {type: 'bleed', duration: weapon.stats.getValue('bleed-duration')}
      fightData.playerStates[defender].buffs.push(bleedStack)
    }
    return fightData
  },

  tick (fightData) {

  }
}
