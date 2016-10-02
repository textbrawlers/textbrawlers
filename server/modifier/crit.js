export default {
  apply (fightData) {
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (Math.random() < weapon.stats.getValue('crit-chance')) {
      fightData.crits = 1
      if (Math.random() < weapon.stats.getValue('crit-chance') - 1) {
        fightData.crits = 2
        fightData.damage *= (1 + (1.5 * weapon.stats.getValue('crit-damage')))
      } else {
        fightData.damage *= (1 + weapon.stats.getValue('crit-damage'))
      }
    }
    return fightData
  }
}
