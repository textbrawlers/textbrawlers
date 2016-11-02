export default {
  name: 'block',

  apply (fightData) {
    fightData.textData.blocked = false
    let effectiveBlock = Math.min(fightData.defender.player.stats.getValue('block-chance') - fightData.weapons[fightData.currentWeapon].stats.getValue('armor-pierce'), 0.8)

    if (Math.random() < effectiveBlock) {
      fightData.textData.blocked = true
      fightData.damage *= fightData.defender.player.stats.getValue('block-multiplier')
    }
    return fightData
  }
}
