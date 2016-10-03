// In config.js add an import row to the top of the file.
// Example: import yourMod from 'yourMod.js'.
// In this case yourMod is replaced with example.
// Also add the name you set at import to the modifier array.
// Example: arr = { otherMod, otherMod, yourMod }.
// Where this code says "Modify fightData" you are to place all logic for that function.

export default {
  apply (fightData) {
    const defender = fightData.defenderIndex
    const weapon = fightData.weapons[fightData.currentWeapon]
	let tempDamageCalc = 0
	
    const ps = fightData.playerStates[defender]
    ps.buffs = ps.buffs.filter(buff => !(buff.type === 'bleed' && buff.duration <= 0))
    ps.buffs.filter(buff => buff.type === 'bleed').forEach(buff => {
      tempDamageCalc++
    })
	fightData.damage *= 1 + (Math.min((tempDamageCalc/10), weapon.stats.GetValue('bloodlust')))
	
    return fightData
  },
}
