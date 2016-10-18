export default {
  apply (fightData) {
    if (fightData.modifierStorage.multistrike.multistrikesLeft < 1) {
      fightData.modifierStorage.multistrike = {
        multistrikesLeft: 0
      }
    }

    let multistrikes = fightData.weapons[fightData.currentWeapon].stats.getValue('multistrike')

    if (fightData.modifierStorage.multistrike.multistrikesLeft > 0) {
      fightData.modifierStorage.multistrike.multistrikesLeft--
    } else {
      fightData.modifierStorage.multistrike.multestrikesLeft = multistrikes
      fightData.numAttacks += multistrikes - 1
    }

    fightData.damage /= multistrikes

    return fightData
  }
}
