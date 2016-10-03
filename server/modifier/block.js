export default {
  apply (fightData) {
    fightData.textData.blocked = false
    if (Math.random() < fightData.defender.player.stats.getValue('block-chance') - fightData.weapons[fightData.currentWeapon].stats.getValue('armor-pierce')) {
      fightData.textData.blocked = true
      fightData.damage *= fightData.defender.player.stats.getValue('block-multiplier')
    }
    return fightData
  }
}
