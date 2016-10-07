export default {
  init (fightData) {
    fightData.modifierStorage.dodge = {
      dodged: false,
      removed: 0
    }
    let dodgeMod = 0

    if (fightData.weapons[fightData.currentWeapon].stats.getValue('ranged') === true) {
      dodgeMod -= 0.05
    }
    if (fightData.weapons[fightData.currentWeapon].stats.getValue('slow') === true) {
      dodgeMod += 0.1
    }

    dodgeMod += fightData.defender.player.stats.getValue('dodge-chance')

    if (Math.random() < dodgeMod) {
      fightData.modifierStorage.dodge.dodged = true

      if (Math.floor(fightData.numAttacks) === 0) {
        fightData.numAttacks *= 1 - dodgeMod
      } else {
        fightData.modifierStorage.dodge.removed = dodgeMod
        fightData.numAttacks -= dodgeMod
      }
    }
    return fightData
  },

  end (fightData) {
    fightData.numAttacks += fightData.modifierStorage.dodge.removed
    return fightData
  }
}
