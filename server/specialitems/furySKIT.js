/*
applyFury (weaponDamageMult) {
  let attacker = this.getCurrentAttackerIndex()
  if (this.playerStates[attacker].buffs.find(buff => buff.type === 'fury')) {
    let buffIndex = this.playerStates[attacker].buffs.findIndex(buff => buff.type === 'fury')
    const newBuff = {
      type: 'fury',
      damageMult: weaponDamageMult * this.playerStates[attacker].buffs[buffIndex].damageMult
    }
    this.playerStates[attacker].buffs[buffIndex] = newBuff
  } else {
    const newBuff = {
      type: 'fury',
      damageMult: weaponDamageMult
    }
    this.playerStates[attacker].buffs.push(newBuff)
  }
}

resetFury () {
  let attacker = this.getCurrentAttackerIndex()
  if (this.playerStates[attacker].buffs.find(buff => buff.type === 'fury')) {
    let buffIndex = this.playerStates[attacker].buffs.findIndex(buff => buff.type === 'fury')
    const newBuff = {
      type: 'fury',
      damageMult: 1
    }
    this.playerStates[attacker].buffs[buffIndex] = newBuff
  }
}
*/
