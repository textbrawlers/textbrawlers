// In config.js add an import row to the top of the file.
// Example: import yourMod from 'yourMod.js'.
// In this case yourMod is replaced with example.
// Also add the name you set at import to the modifier array.
// Example: arr = { otherMod, otherMod, yourMod }.
// Where this code says "Modify fightData" you are to place all logic for that function.

export default {
  apply (fightData) {
    const defender = fightData.defenderIndex
    const attacker = fightData.attackerIndex
	
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
