export default {
  apply (fightData) {
    let dodgeMod = 0
    fightData.modifierStorage.didDodge = false

    if (fightData.weapons[fightData.currentWeapon].stats.getValue('ranged') === true) {
      dodgeMod -= 0.1
    }
    if (fightData.weapons[fightData.currentWeapon].stats.getValue('slow') === true) {
      dodgeMod += 0.2
    }

    if (Math.random() < fightData.defender.player.stats.getValue('dodge-chance') + dodgeMod) {
      fightData.miss = true
      fightData.modifierStorage.didDodge = true
      fightData.damage = 0
    }

    return fightData
  }
}
