export default {
  name: 'timestop',

  end (fightData) {
    if (Math.random() < fightData.attacker.player.stats.getValue('timestop') && !fightData.modifierStorage.timestoppedLastTurn) {
      fightData.modifierStorage.timestop = true
    }
    if (fightData.modifierStorage.timestop && fightData.numAttacks < 1 && !fightData.weapons[fightData.currentWeapon + 1]) {
      fightData.turn = fightData.turn > 0 ? fightData.turn - 1 : fightData.playerStates.length - 1
    }
    return fightData
  },

  newTurn (fightData) {
    if (fightData.modifierStorage.timestop) {
      fightData.modifierStorage.timestop = false
      fightData.modifierStorage.timestoppedLastTurn = true
    } else {
      fightData.modifierStorage.timestoppedLastTurn = false
    }
    return fightData
  },

  turnText (textData) {
    if (textData.modifierStorage.timestoppedLastTurn) {
      return '[attacker] stopped time and got another turn.'
    }
  }
}
