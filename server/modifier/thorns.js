export default {
  apply (fightData) {
    let thornsDamage = fightData.defender.player.stats.getValue('thorns')
    let damageToDeal = 0

    if (fightData.blocked) {
      if (Math.random() < fightData.attacker.player.stats.getValue('block-chance')) {
        damageToDeal = Math.round(thornsDamage * fightData.attacker.player.stats.getValue('block-multiplier'))
        if (damageToDeal < 1 && thornsDamage > 0) {
          damageToDeal = 1
        }
        fightData.attacker.currentHP -= damageToDeal
      } else {
        fightData.attacker.currentHP -= thornsDamage
      }
    }

    return fightData
  }
}
