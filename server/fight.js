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

  attack () {
    this.attacker = this.playerStates[this.turn]
    this.defender = this.playerStates[this.turn + 1] || this.playerStates[0]

    this.weapons = this.attacker.player.weaponStats

    if (this.numAttacks <= 0){
      this.numAttacks = this.weapons[this.currentWeapon].stats.getValue('attack-speed')
    }

    let damage = 0
    if(Math.random() <= this.numAttacks){
      damage = this.weapons[this.currentWeapon].stats.getValue('damage')

      damage *= this.weapons[this.currentWeapon].stats.getValue('damage-multiplier')

      if (Math.random() <= this.weapons[this.currentWeapon].stats.getValue('crit-chance')){
        damage *= this.weapons[this.currentWeapon].stats.getValue('crit-damage')
      }

      this.defender.currentHP -= damage
    }

    this.numAttacks -= 1

    const resp = {
      playerStates: this.playerStates.map(s => ({
        currentHP: s.currentHP,
        maxHP: s.maxHP
      })),
      damage: damage,
      attacer: this.turn
    }

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

    if (this.defender.currentHP <= 0) {
      resp.done = true
    }

    return resp
  }
}
