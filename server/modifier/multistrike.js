export default {
  weaponChange (fightData) {
    fightData.numAttacks *= Math.max(fightData.weapons[fightData.currentWeapon].stats.getValue('multistrike'), 1)
    return fightData
  },

  apply (fightData) {
    fightData.damage /= Math.max(fightData.weapons[fightData.currentWeapon].stats.getValue('multistrike'), 1)
    return fightData
  }
}
