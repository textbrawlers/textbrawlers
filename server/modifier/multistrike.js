export default {
  weaponChange (fightData) {
    fightData.numAttacks *= fightData.weapons[fightData.currentWeapon].stats.getValue('multistrike')
    return fightData
  },

  apply (fightData) {
    fightData.damage /= fightData.weapons[fightData.currentWeapon].stats.getValue('multistrike')
    return fightData
  }
}
