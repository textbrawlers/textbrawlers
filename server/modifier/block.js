export default {
  apply (fightData) {
    let damage = fightData.damage
    let blocked = false
    if (Math.random() < fightData.defender.player.getStat('block-chance').value - fightData.weapons[fightData.currentWeapon].stats.getValue('armor-pierce')) {
      blocked = true
      damage *= fightData.defender.player.getStat('block-multiplier').value
    }
    return {
      blocked: blocked,
      damage: damage
    }
  }
}
