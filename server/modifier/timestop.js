export default {
  name: 'timestop',

  end (fightData) {
    if (Math.random() < fightData.attacker.player.stats.getValue('timestop') && !fightData.modifierStorage.timestoppedLastTurn) {
      fightData.turn = fightData.turn > 0 ? fightData.turn - 1 : fightData.playerStates.length - 1
      fightData.modifierStorage.timestop = true
      console.log('timestop = true')
    }
    return fightData
  },

  newTurn (fightData) {
    console.log('new turn')
    if (fightData.modifierStorage.timestop) {
      fightData.modifierStorage.timestop = false
      fightData.modifierStorage.timestoppedLastTurn = true
    } else {
      fightData.modifierStorage.timestoppedLastTurn = false
    }
  },

  turnText (textData) {
    if (textData.modifierStorage.timestoppedLastTurn) {
      return '[attacker] stopped time and got another turn.'
    }
  }
}
