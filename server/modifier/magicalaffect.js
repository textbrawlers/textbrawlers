export default {
  apply (fightData) {
    const defender = fightData.defenderIndex
    const oldBuffs = fightData.playerStates[defender].buffs
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (weapon.stats.getValue('magical-affect')) {
      let chance = weapon.stats.getValue('magical-affect')
      if (oldBuffs.find(buff => buff.type === 'magical-affect')) {
        const buffIndex = oldBuffs.find(buff => buff.type === 'magical-affect')
        const rand = Math.random()
        const oldBuff = oldBuffs[buffIndex]

        for (let i = 0; i < oldBuff.stacks; i++) {
          chance /= 2
        }
        if (rand < chance) {
          const newBuff = {
            type: 'magical-affect',
            stacks: oldBuff.stacks + 1
          }
          fightData.playerStates[defender].buffs[buffIndex] = newBuff
        } else {
          for (let i = 0; i < oldBuff.stacks; i++) {
            fightData.damage *= 1.5
          }
          fightData.playerStates[defender].buffs.splice(buffIndex, 1)
        }
      } else if (Math.random() < chance) {
        const newBuff = {
          type: 'magical-affect',
          stacks: 1
        }
        fightData.playerStates[defender].buffs.push(newBuff)
      }
    }
    return fightData
  }
}
