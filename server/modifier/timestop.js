export default {
  end (fightData) {
    if (Math.random() < fightData.attacker.player.stats.getValue('timestop')) {
      fightData.turn = fightData.turn > 0 ? fightData.turn-- : fightData.playerStates.length - 1
    }
    return fightData
  }
}
