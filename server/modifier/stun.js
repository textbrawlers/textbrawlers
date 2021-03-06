export default {
  name: 'stun',

  apply (fightData) {
    const defender = fightData.defenderIndex
    if (Math.random() < fightData.weapons[fightData.currentWeapon].stats.getValue('stun-chance') && !fightData.defender.buffs.find(b => b.type === 'stun')) {
      fightData.playerStates[defender].buffs.push({type: 'stun'})
    }
    return fightData
  },

  weaponChange (fightData) {
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
