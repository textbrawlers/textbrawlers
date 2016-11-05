export default {
  name: 'timestop',

  end (fightData) {
    fightData.modifierStorage.timestop = false
    if (fightData.numAttacks < 1 && fightData.weapons[fightData.currentWeapon + 1]) {
      if (Math.random() < fightData.attacker.player.stats.getValue('timestop')) {
        fightData.turn = fightData.turn > 0 ? fightData.turn - 1 : fightData.playerStates.length - 1
        fightData.modifierStorage.timestop = true
      }
    }
    return fightData
  },

  newTurn (fightData) {
    return fightData.modifierStorage.timestop ? { timestop: true } : undefined
  },

  turnText (textData) {
    if (textData.timestop) {
      return {
        chance: 100,
        text: '[attacker] stopped time and got another turn.'
      }
    }
  }
}
