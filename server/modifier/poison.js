export default {
  apply (fightData) {
    const defender = fightData.defenderIndex
    const oldBuffs = fightData.playerStates[defender].buffs
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (weapon.stats.getValue('poison-duration')) {
      if (oldBuffs.find(buff => buff.type === 'poison')) {
        const buffIndex = oldBuffs.findIndex(buff => buff.type === 'poison')

        if (oldBuffs[buffIndex].damage < weapon.stats.getValue('poison-damage')) {
          const newBuff = {
            type: 'poison',
            duration: weapon.stats.getValue('poison-duration'),
            damage: weapon.stats.getValue('poison-damage')
          }
          fightData.playerStates[defender].buffs[buffIndex] = newBuff
        } else {
        }
      } else {
        const newBuff = {
          type: 'poison',
          duration: weapon.stats.getValue('poison-duration'),
          damage: weapon.stats.getValue('poison-damage')
        }
        fightData.playerStates[defender].buffs.push(newBuff)
      }
    }
    return fightData
  },

  tick () {

  }
}
