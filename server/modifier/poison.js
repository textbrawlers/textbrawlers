export default {
  apply (fightData) {
    let resp = {}
    const defender = fightData.defenderIndex
    const oldBuffs = fightData.playerStates[defender].buffs
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (weapon.stats.getValue('poison-duration')) {
      if (oldBuffs.find(buff => buff.type === 'poison')) {
        const buffIndex = oldBuffs.findIndex(buff => buff.type === 'poison')

        if (oldBuffs[buffIndex].damage < weapon.stats.getValue('poison-damage')) {
          resp = {
            buff: {
              action: 'replace',
              index: fightData.index,
              buff: {
                type: 'poison',
                duration: weapon.stats.getValue('poison-duration'),
                damage: weapon.stats.getValue('poison-damage')
              }
            }
          }
        }
      } else {
        resp = {
          buff: {
            action: 'add',
            buff: {
              type: 'poison',
              duration: weapon.stats.getValue('poison-duration'),
              damage: weapon.stats.getValue('poison-damage')
            }
          }
        }
      }
    }
    return resp
  },

  tick () {

  }
}
