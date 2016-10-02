export default {
  apply (fightData) {
    fightData.blocked = false
    if (Math.random() < fightData.defender.player.getStat('block-chance').value - fightData.weapons[fightData.currentWeapon].stats.getValue('armor-pierce')) {
      fightData.blocked = true
      fightData.damage *= fightData.defender.player.getStat('block-multiplier').value
    }
    return fightData
  }
}
