import * as SMath from 'common/api/specmath'

export default class Fight {
  constructor (players) {
    this.playerStates = players.map(player => ({
      currentHP: Math.round(player.getStat('max-health').value),
      maxHP: Math.round(player.getStat('max-health').value),
      player: player
    }))

    this.turn = SMath.randomInt(this.playerStates.length)
    this.currentWeapon = 0
    this.numAttacks = 0
  }

  buffs() {

  }

  attack() {
    this.initAttack()
    this.doAttack()
    const resp = this.createResponse()
    this.endAttack()

    if (this.defender.currentHP <= 0) {
      resp.done = true
    }
    return resp
  }

  initAttack() {
    this.attacker = this.playerStates[this.turn]
    this.defender = this.playerStates[this.turn + 1] || this.playerStates[0]

    this.weapons = this.attacker.player.weaponStats

    if (this.numAttacks <= 0){
      this.numAttacks = this.weapons[this.currentWeapon].stats.getValue('attack-speed')
    }
  }

  endAttack() {
    this.numAttacks -= 1
    if (this.numAttacks <= 0) {
      this.currentWeapon++
      if (!this.weapons[this.currentWeapon]) {
        this.turn ++
        this.currentWeapon = 0
        if (!this.playerStates[this.turn]) {
          this.turn = 0
        }
      }
    }
  }

  createResponse(){
    return {
      playerStates: this.playerStates.map(s => ({
        currentHP: s.currentHP,
        maxHP: s.maxHP
      })),
      damage: this.damage,
      attacker: this.turn,
      miss: this.miss,
      crit: this.crits
    }
  }

  doAttack() {
    this.damage = 0
    if(Math.random() <= this.numAttacks){

      this.damage = this.weapons[this.currentWeapon].stats.getValue('damage')
      this.damage *= (1 + this.weapons[this.currentWeapon].stats.getValue('damage-multiplier'))

      this.applyCrit()
      this.applyBleed()

      this.damage = Math.round(this.damage)
      this.defender.currentHP -= this.damage
    }
    else{
      this.miss = true
    }
  }

  applyCrit(){
    if (Math.random() <= this.weapons[this.currentWeapon].stats.getValue('crit-chance')){
      this.crits = 1
      if (Math.random() <= this.weapons[this.currentWeapon].stats.getValue('crit-chance') - 1){
        this.crits = 2
        this.damage *= 1.5 * this.weapons[this.currentWeapon].stats.getValue('crit-damage')
      }
      else{
        this.damage *= this.weapons[this.currentWeapon].stats.getValue('crit-damage')
      }
    }
  }

  applyBleed(){
    let currentDefenderIndex = 0
    if(this.playerStates[this.turn + 1]){
      currentDefenderIndex = this.turn + 1
    }
    if (!this.playerStates[currentDefenderIndex].bleedDuration && Math.random() <= this.weapons[this.currentWeapon].stats.getValue('bleed-chance')){
      this.playerStates[currentDefenderIndex].bleedDuration =
        this.weapons[this.currentWeapon].stats.getValue('bleed-duration')
    }
  }
}
