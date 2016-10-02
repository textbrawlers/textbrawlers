export default {
  apply (fightData) {
    const defender = fightData.defenderIndex
    if (Math.random() < fightData.weapons[fightData.currentWeapon].stats.getValue('stun-chance')) {
      fightData.playerStates[defender].buffs.push({type: 'stun'})
    }
    return fightData
  }
}
