export default {
  name: 'burn',

  apply (fightData) {
    const defender = fightData.defenderIndex
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (Math.random() < weapon.stats.getValue('burn-chance')) {
      const oldBuffs = fightData.playerStates[defender].buffs

      if (oldBuffs.find(buff => buff.type === 'burn')) {
        const buffIndex = oldBuffs.findIndex(buff => buff.type === 'burn')

        if (oldBuffs[buffIndex].damage < weapon.stats.getValue('burn-damage')) {
          const newBuff = {
            type: 'burn',
            duration: 3,
            baseDmg: fightData.damage,
            damageMult: weapon.stats.getValue('burn-damage')
          }
          fightData.playerStates[defender].buffs[buffIndex] = newBuff
        }
      } else {
        const newBuff = {
          type: 'burn',
          duration: 3,
          baseDmg: fightData.damage,
          damageMult: weapon.stats.getValue('burn-damage')
        }
        fightData.playerStates[defender].buffs.push(newBuff)
      }
    }
    return fightData
  },

  tick (fightData) {
    const ps = fightData.playerStates[fightData.defenderIndex]
    ps.buffs = ps.buffs.filter(b => !(b.type === 'burn' && b.duration <= 0))
    const buff = ps.buffs.find(b => b.type === 'burn')
    if (buff) {
      fightData.dots.burn = {
        type: 'burn',
        damage: Math.round(buff.damageMult * buff.baseDmg)
      }
      buff.duration--
    }
    return fightData
  }
}
