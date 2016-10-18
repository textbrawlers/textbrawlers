export default {
  weaponChange (fightData) {
    if (fightData.modifierStorage.timestop.hasTimeStopped) {
      fightData.numAttacks += fightData.weapons[fightData.currentWeapon].stats.getValue('timestop-accel')
    }
    return fightData
  }
}
