export default {
  name: 'block',

  apply (fightData) {
    fightData.textData.blocked = false

    let blockChanceMod = -fightData.weapons[fightData.currentWeapon].stats.getValue('armor-pierce')
    if (fightData.weapons[fightData.currentWeapon].stats.getValue('ranged')) {
      blockChanceMod += 0.2
    }

    let effectiveBlock = Math.min(fightData.defender.player.stats.getValue('block-chance') + blockChanceMod, 0.8)

    if (Math.random() < effectiveBlock) {
      fightData.textData.blocked = true
      fightData.damage *= fightData.defender.player.stats.getValue('block-multiplier')
    }
    return fightData
  }
}
