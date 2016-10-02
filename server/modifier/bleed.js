export default {
  apply(fightData) {
    let bleedStack = {}
    const defender = fightData.defenderIndex
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (Math.random() <= weapon.stats.getValue('bleed-chance')) {
      bleedStack = {
        type: 'bleed', duration: weapon.stats.getValue('bleed-duration')
      }
    }
    return {
      bleedStack: bleedStack
    }
  },

  tick(fightData) {

  }
}
