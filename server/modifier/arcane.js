export default {
  apply (fightData) {
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
          fightData.damage += oldBuffs[buffIndex].storedDmg
          fightData.arcaneDamage = oldBuffs[buffIndex].storedDmg
          fightData.playerStates[defender].buffs.splice(buffIndex, 1)
        } else if (damage < weapon.stats.getValue('arcane-damage')) {
          const newBuff = {
            type: 'arcane',
            stacks: currentStacks + 1,
            damage: weapon.stats.getValue('arcane-damage'),
            storedDmg: oldBuffs[buffIndex].storedDmg
          }
          fightData.playerStates[defender].buffs[buffIndex] = newBuff
        } else {
          fightData.playerStates[defender].buffs[buffIndex].stacks++
        }
      } else {
        const newBuff = {
          type: 'arcane',
          stacks: 1,
          damage: weapon.stats.getValue('arcane-damage'),
          storedDmg: 0
        }
        fightData.playerStates[defender].buffs.push(newBuff)
      }
    }
    return fightData
  },

  tick (fightData) {
    const buff = fightData.playerStates[fightData.defenderIndex].buffs.find(b => b.type === 'arcane')
    if (buff) {
      fightData.dots.arcaneDamage = 1
      buff.storedDmg += buff.damage + 1
    }
    return fightData
  }
}
