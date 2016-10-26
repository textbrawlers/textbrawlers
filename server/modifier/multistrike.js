export default {
  apply (fightData) {
    if (Math.random() < fightData.weapons[fightData.currentWeapon].stats.getValue('multistrike-chance')) {
      if (fightData.numAttacks < 1) {
        fightData.numAttacks = 2
      } else {
        fightData.numAttacks++
      }
    }

    return fightData
  }
}
