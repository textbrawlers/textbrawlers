export default {
  apply (fightData) {
    let resp = {}
    const defender = fightData.defenderIndex
    const chance = fightData.weapons[fightData.currentWeapon].stats.getValue('arcane-chance')

    if (Math.random() < chance) {
      const oldBuffs = fightData.playerStates[defender].buffs
      const weapon = fightData.weapons[fightData.currentWeapon]

      if (oldBuffs.find(buff => buff.type === 'arcane')) {
        const buffIndex = oldBuffs.findIndex(buff => buff.type === 'arcane')
        let damage = oldBuffs[buffIndex].damage
        let currentStacks = oldBuffs[buffIndex].stacks

        if (currentStacks >= 4) {
          resp = {
            damage: fightData.damage + oldBuffs[buffIndex].storedDmg,
            arcaneDamage: oldBuffs[buffIndex].storedDmg,
            buff: {
              action: 'splice',
              index: fightData.index
            }
          }
        } else if (damage < weapon.stats.getValue('arcane-damage')) {
          resp = {
            buff: {
              action: 'replace',
              index: fightData.index,
              buff: {
                type: 'arcane',
                stacks: currentStacks + 1,
                damage: weapon.stats.getValue('arcane-damage'),
                storedDmg: oldBuffs[buffIndex].storedDmg
              }
            }
          }
        } else {
          resp = {
            buff: {
              action: 'replace',
              index: fightData.index,
              buff: {
                type: 'arcane',
                stacks: currentStacks + 1,
                damage: oldBuffs[buffIndex].damage,
                storedDmg: oldBuffs[buffIndex].storedDmg
              }
            }
          }
        }
      } else {
        resp = {
          buff: {
            action: 'add',
            buff: {
              type: 'arcane',
              stacks: 1,
              damage: weapon.stats.getValue('arcane-damage'),
              storedDmg: 0
            }
          }
        }
      }
    }
    return resp
  }
}
