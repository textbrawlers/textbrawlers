export default {
  apply (fightData) {
    const defender = fightData.defenderIndex
    const oldBuffs = fightData.playerStates[defender].buffs
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (weapon.stats.getValue('poison-duration')){
      if (oldBuffs.find(buff => buff.type === 'poison')) {
        //this.log('ID: ' + this.attackId + '. Poison, dot found.')
        const buffIndex = oldBuffs.findIndex(buff => buff.type === 'poison')

        if (oldBuffs[buffIndex].damage < weapon.stats.getValue('poison-damage')) {
          //this.log('ID: ' + this.attackId + '. Poison, new dot is stronger, applying.')
          const newBuff = {
            type: 'poison',
            duration: weapon.stats.getValue('poison-duration'),
            damage: weapon.stats.getValue('poison-damage')
          }
          fightData.playerStates[defender].buffs[buffIndex] = newBuff
        } else {
          //this.log('ID: ' + this.attackId + '. Poison, old dot is stonger.')
        }
      } else {
        const newBuff = {
          type: 'poison',
          duration: weapon.stats.getValue('poison-duration'),
          damage: weapon.stats.getValue('poison-damage')
        }
        fightData.playerStates[defender].buffs.push(newBuff)
        //this.log('ID: ' + this.attackId + '. Poison, dot not found, applying.')
      }
    } else {
      //this.log('ID: ' + this.attackId + '. Poison, no poisonous weapon equipped.')
    }
  },

  tick() {

  }
}
