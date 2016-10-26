export default {
  apply (fightData) {
    if (fightData.weapons[fightData.currentWeapon].stats.getValue('rampage-chance') < ) {
      if (fightData.numAttacks < 1) {
        fightData.numAttacks = 2
      } else {
        fightData.numAttacks++
      }
    }

    return fightData
  }
}
