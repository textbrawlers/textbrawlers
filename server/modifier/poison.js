export default {
  apply (fightData) {
    const defender = fightData.defenderIndex
    const oldBuffs = fightData.playerStates[defender].buffs
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (weapon.stats.getValue('poison-duration') && !fightData.miss) {
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

  tick (fightData) {
    const ps = fightData.playerStates[fightData.defenderIndex]
    ps.buffs = ps.buffs.filter(b => !(b.type === 'poison' && b.duration <= 0))
    const buff = ps.buffs.find(b => b.type === 'poison')
    if (buff) {
      fightData.dots.poison = {
        type: 'poison',
        damage: buff.damage
      }
      buff.duration--
    }
    return fightData
  }
}
