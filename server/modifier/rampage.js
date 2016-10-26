export default {
  apply (fightData) {
    if (Math.random() < fightData.weapons[fightData.currentWeapon].stats.getValue('rampage-chance')) {
      if (fightData.numAttacks < 1) {
        fightData.numAttacks = 2
      } else {
        fightData.numAttacks++
      }
    }

    return fightData
  }
}
