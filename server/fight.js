import * as SMath from 'common/api/specmath.js'
import modifierHandler from './modifierHandler.js'

export default class Fight {
  constructor (players) {
    let playerStates = players.map(player => ({
      currentHP: Math.round(player.getStat('max-health').value),
      maxHP: Math.round(player.getStat('max-health').value),
      player: player,
      buffs: []
    }))

    this.modifierStorage = {}
    this.playerStates = playerStates
    this.turn = this.luckWeightLifter(players)
    this.currentWeapon = 0
    this.numAttacks = 0
    this.attackId = 0
  }

  luckWeightLifter (players) {
    let maxWeight = 0
    players.forEach(player => {
      const playerLuckValue = player.stats.getValue('luck')
      if (playerLuckValue) {
        maxWeight += 10 * (1 + playerLuckValue)
      } else {
        maxWeight += 10
      }
    })
    const weight = SMath.randomInt(maxWeight)
    let currWeight = 0
    const index = players.findIndex(player => {
      const playerLuckValue = player.stats.getValue('luck')
      if (playerLuckValue) {
        currWeight += 10 * (1 + playerLuckValue)
      } else {
        currWeight += 10
      }
      return weight < currWeight
    })
    return index >= 0 ? index : 0
  }

  attack () {
    this.attackId++
    let resp
    this.buffRound = this.checkTick() ? this.buffRound : false
    if (this.buffRound) {
      resp = this.tick()
      this.buffRound = false
    } else {
      this.initAttack()
      this.doAttack()
      resp = this.createResponse()
      this.endAttack()

      if (this.defender.currentHP <= 0) {
        resp.done = true
      }
    }
    return resp
  }

  initAttack () {
    this.textData = {}

    this.attackerNum = this.turn
    this.defenderNum = this.playerStates[this.turn + 1] ? this.turn + 1 : 0

    this.attacker = this.playerStates[this.attackerNum]
    this.defender = this.playerStates[this.defenderNum]

    this.weapons = this.attacker.player.weaponStats

    if (this.weapons.length > 0 && this.weapons[this.currentWeapon]) {
      if (this.numAttacks <= 0) {
        this.numAttacks = this.weapons[this.currentWeapon].stats.getValue('attack-speed')
        Object.assign(this, modifierHandler.weaponChange(this))
      }
      Object.assign(this, modifierHandler.init(this))
    } else if (!this.weapons[this.currentWeapon]) {
      this.hasWeapon = false
    }
  }

  endAttack () {
    Object.assign(this, modifierHandler.end(this))
    this.numAttacks -= 1
    if (this.numAttacks <= 0) {
      this.currentWeapon++
      if (!this.weapons[this.currentWeapon]) {
        this.buffRound = true
        this.turn++
        this.currentWeapon = 0
        if (!this.playerStates[this.turn]) {
          this.turn = 0
        }
      }
    }
  }

  createResponse () {
    this.textData.hasWeapon = this.hasWeapon
    this.textData.missed = this.miss

    return {
      type: 'regular',
      playerStates: this.playerStates.map(s => ({
        currentHP: s.currentHP,
        maxHP: s.maxHP,
        id: s.player.id,
        buffs: s.buffs
      })),
      damage: this.damage,
      attacker: this.attackerNum,
      defender: this.defenderNum,
      weapon: this.currentWeapon,
      textData: this.textData
    }
  }

  doAttack () {
    this.damage = 0
    if (this.weapons[0]) {
      this.hasWeapon = true
      if (this.findAmmo()) {
        this.miss = false
        if (Math.random() <= this.numAttacks) {
          this.damage = this.weapons[this.currentWeapon].stats.getValue('damage')
          this.damage *= (1 + this.weapons[this.currentWeapon].stats.getValue('damage-multiplier'))

          this.attackerIndex = this.getCurrentAttackerIndex()
          this.defenderIndex = this.getCurrentDefenderIndex()

          Object.assign(this, modifierHandler.apply(this))

          if (this.damage < 1) {
            this.damage = 1
          }

          this.damage = Math.round(this.damage)
          this.defender.currentHP -= this.damage
        } else {
          this.miss = true
        }
      } else {
        this.ammo = false
        console.log('No ammo')
      }
    } else {
      this.hasWeapon = false
    }
  }

  findAmmo () {
    let result = true
    const weapon = this.weapons[this.currentWeapon]
    if (weapon.stats.getValue('required-ammo')) {
      result = false
      const neededAmmoType = weapon.stats.getValue('required-ammo')
      Object.entries(this.attacker.player.equipped.inventory).find(([slot, item]) => {
        if (item.type === neededAmmoType) {
          result = true
        }
      })
    }
    return result
  }

  getCurrentDefenderIndex () {
    let currentDefenderIndex = 0
    if (this.playerStates[this.turn + 1]) {
      currentDefenderIndex = this.turn + 1
    }
    return currentDefenderIndex
  }

  getCurrentAttackerIndex () {
    return this.turn
  }

  checkTick () {
    let defender = this.getCurrentDefenderIndex()
    if (this.playerStates[defender].buffs.length > 0) {
      return true
    }
    return false
  }

  tick () {
    let resp = {}
    this.defenderIndex = this.getCurrentDefenderIndex()

    this.dots = {}
    Object.assign(this, modifierHandler.tick(this))

    let totalDamage = 0
    Object.entries(this.dots).forEach(([dot, obj]) => {
      totalDamage += obj.damage
    })

    this.playerStates[this.getCurrentDefenderIndex()].currentHP -= Math.round(totalDamage)

    resp = {
      type: 'buff',
      playerStates: this.playerStates.map(s => ({
        currentHP: s.currentHP,
        maxHP: s.maxHP,
        id: s.player.id,
        buffs: s.buffs
      })),
      attacker: this.getCurrentAttackerIndex(),
      playerDamaged: this.getCurrentDefenderIndex(),
      dots: this.dots
    }

    if (this.playerStates[this.getCurrentDefenderIndex()].currentHP <= 0) {
      resp.done = true
    }

    return resp
  }
}
