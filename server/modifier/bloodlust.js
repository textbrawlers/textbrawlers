export default {
  name: 'bloodlust',

  apply (fightData) {
    const defender = fightData.defenderIndex
    const weapon = fightData.weapons[fightData.currentWeapon]
    let tempDamageCalc = 0

    const ps = fightData.playerStates[defender]
    ps.buffs.filter(buff => buff.type === 'bleed').forEach(buff => {
      tempDamageCalc++
    })
    fightData.damage *= 1 + (Math.min((tempDamageCalc / 10), weapon.stats.getValue('bloodlust')))

    return fightData
  }
}
