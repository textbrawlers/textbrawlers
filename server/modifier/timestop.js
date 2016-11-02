export default {
  name: 'timestop',

  end (fightData) {
    fightData.modifierStorage.timestop = {
      hasTimeStopped: false
    }
    if (Math.random() < fightData.attacker.player.stats.getValue('timestop')) {
      fightData.turn = fightData.turn > 0 ? fightData.turn - 1 : fightData.playerStates.length - 1
      fightData.currentWeapon = 0
      fightData.modifierStorage.timestop.hasTimeStopped = true
    }
    return fightData
  }
}
