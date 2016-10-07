export default {
  apply (fightData) {
    const defender = fightData.defenderIndex
    if (Math.random() < fightData.weapons[fightData.currentWeapon].stats.getValue('stun-chance')) {
      fightData.playerStates[defender].buffs.push({type: 'stun'})
    }
    return fightData
  },

  init (fightData) {
    if (fightData.attacker.buffs.find(b => b.type === 'stun')) {
      fightData.numAttacks /= 2
    }
    return fightData
  },

  tick (fightData) {
    const ps = fightData.playerStates[fightData.defenderIndex]
    ps.buffs = ps.buffs.filter(b => !(b.type === 'stun'))
    return fightData
  }
}
