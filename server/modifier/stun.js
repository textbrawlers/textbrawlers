export default {
  apply (fightData) {
    let resp = {}
    if (Math.random() < fightData.weapons[fightData.currentWeapon].stats.getValue('stun-chance')) {
      resp = {
        buff: {
          action: 'add',
          buff: {
            type: 'stun'
          }
        }
      }
    }
    return resp
  }
}
