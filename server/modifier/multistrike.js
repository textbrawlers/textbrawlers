export default {
  init (fightData) {    
    if (fightData.modifierStorage.multistrike.multistrikeCounter) {
      let hitMod = 1 - (0.5 ^ fightData.modifierStorage.multistrike.multistrikeCounter )
      if (Math.random() < hitMod) {
        fightData.modifierStorage.multistrike.remainingAttacks = fightData.numAttacks
        fightData.numAttacks *= 0
      }
    }

    return fightData
  },

  weaponChange (fightData) {
    fightData.modifierStorage.multistrike = {
      multistrikeCounter: 0,
      remainingAttacks: 0
    }
    return fightData
  },

  apply (fightData) {
    if (!fightData.modifierStorage.multistrike.multistrikeCounter) {
      fightData.modifierStorage.multistrike.multistrikeCounter = 0
    }
    if (fightData.modifierStorage.multistrike.multistrikeCounter < fightData.weapons[fightData.currentWeapon].stats.getValue('multistrike') - 1) {
      if (fightData.numAttacks < 1) {
        fightData.numAttacks = 2
      } else {
        fightData.numAttacks++
      }
      fightData.damage /= 2
      fightData.modifierStorage.multistrike.multistrikeCounter++
    } else {
      fightData.modifierStorage.multistrike.multistrikeCounter = 0
    }

    return fightData
  },

  end (fightData) {
    if (fightData.modifierStorage.multistrike.remainingAttacks) {
      fightData.numAttacks += fightData.modifierStorage.multistrike.remainingAttacks
      fightData.modifierStorage.multistrike.remainingAttacks = 0
    }
    return fightData
  }
}
