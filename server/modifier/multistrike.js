export default {
  apply (fightData) {
    const weapon = fightData.weapons[fightData.currentWeapon]
    if (Math.random() < weapon.stats.getValue('multistrike-chance')) {
      if (fightData.numAttacks < 1) {
        fightData.numAttacks = 2
      } else {
        fightData.numAttacks++
      }
    }

    return fightData
  }
}
