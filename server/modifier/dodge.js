export default {
  apply (fightData) {
    let dodgeMod = 0
    let didDodge = [didDodge, false]
    if (fightData.weapons[fightData.currentWeapon].stats.getValue('ranged') === true) {
      dodgeMod -= 0.1
    }
    if (fightData.weapons[fightData.currentWeapon].stats.getValue('slow') === true) {
      dodgeMod += 0.2
    }
    
    if (Math.random() < fightData.defender.player.stats.getValue('dodge-chance') + dodgeMod) {
      fightData.miss = true
      didDodge = [didDodge, true]
      fightData.modifierStorage.Push(didDodge)
      fightData.damage *= 0
    }
    
    return fightData
  }
}
