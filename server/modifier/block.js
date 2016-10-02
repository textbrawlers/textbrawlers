export default {
  apply (fightData) {
    fightData.blocked = false
    if (Math.random() < fightData.defender.player.stats.getValue('block-chance') - fightData.weapons[fightData.currentWeapon].stats.getValue('armor-pierce')) {
      fightData.blocked = true
      fightData.damage *= fightData.defender.player.stats.getValue('block-multiplier')
    }
    return fightData
  }
}
