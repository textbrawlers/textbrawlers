export default {
  apply (fightData) {
    let resp = {}
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (Math.random() <= weapon.stats.getValue('bleed-chance')) {
      resp = {
        buff: {
          action: 'add',
          buff: {
            type: 'bleed',
            duration: weapon.stats.getValue('bleed-duration')
          }
        }
      }
    }
    return resp
  },

  tick (fightData) {

  }
}
