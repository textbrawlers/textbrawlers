export default {
  apply (fightData) {
    let resp = {}
    const defender = this.defenderIndex
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (Math.random() < weapon.stats.getValue('burn-chance')) {
      const oldBuffs = fightData.playerStates[defender].buffs

      if (oldBuffs.find(buff => buff.type === 'burn')) {
        const buffIndex = oldBuffs.findIndex(buff => buff.type === 'burn')

        if (oldBuffs[buffIndex].damage < weapon.stats.getValue('burn-damage')) {
          resp = {
            buff: {
              action: 'replace',
              index: fightData.index,
              buff: {
                type: 'burn',
                duration: 3,
                baseDmg: fightData.damage,
                damageMult: weapon.stats.getValue('burn-damage')
              }
            }
          }
        }
      } else {
        resp = {
          buff: {
            action: 'add',
            buff: {
              type: 'burn',
              duration: 3,
              baseDmg: fightData.damage,
              damageMult: weapon.stats.getValue('burn-damage')
            }
          }
        }
      }
    }
    return resp
  }
}
