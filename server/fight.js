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

    this.fightData = {
      modifierStorage: {},
      playerStates: playerStates,
      turn: this.luckWeightLifter(players),
      currentWeapon: 0,
      numAttacks: 0,
      attackId: 0
    }
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
    this.fightData.attackId++
    let resp
    this.fightData.buffRound = this.checkTick() ? this.fightData.buffRound : false
    if (this.fightData.buffRound) {
      resp = this.tick()
      this.fightData.buffRound = false
    } else {
      this.initAttack()
      this.doAttack()
      resp = this.createResponse()
      this.endAttack()

      if (this.fightData.defender.currentHP <= 0) {
        resp.done = true
      }
    }
    return resp
  }

  initAttack () {
    this.fightData.textData = {}

    this.fightData.attackerNum = this.fightData.turn
    this.fightData.defenderNum = this.fightData.playerStates[this.fightData.turn + 1] ? this.fightData.turn + 1 : 0

    this.fightData.attacker = this.fightData.playerStates[this.fightData.attackerNum]
    this.fightData.defender = this.fightData.playerStates[this.fightData.defenderNum]

    this.fightData.weapons = this.fightData.attacker.player.weaponStats

    if (this.fightData.weapons.length > 0) {
      if (this.fightData.numAttacks <= 0) {
        this.fightData.numAttacks = this.fightData.weapons[this.fightData.currentWeapon].stats.getValue('attack-speed')
        this.fightData = modifierHandler.weaponChange(this.fightData)
      }
      this.fightData = modifierHandler.init(this.fightData)
    }
  }

  endAttack () {
    this.fightData.numAttacks -= 1
    this.fightData = modifierHandler.end(this.fightData)
    if (this.fightData.numAttacks <= 0) {
      this.fightData.currentWeapon++
      if (!this.fightData.weapons[this.fightData.currentWeapon]) {
        this.fightData.buffRound = true
        this.fightData.turn++
        this.fightData.currentWeapon = 0
        if (!this.fightData.playerStates[this.fightData.turn]) {
          this.fightData.turn = 0
        }
      }
    }
  }

  createResponse () {
    this.fightData.textData.hasWeapon = this.fightData.hasWeapon
    this.fightData.textData.missed = this.fightData.miss

    return {
      type: 'regular',
      playerStates: this.fightData.playerStates.map(s => ({
        currentHP: s.currentHP,
        maxHP: s.maxHP,
        id: s.player.id,
        buffs: s.buffs
      })),
      damage: this.fightData.damage,
      attacker: this.fightData.attackerNum,
      defender: this.fightData.defenderNum,
      weapon: this.fightData.currentWeapon,
      textData: this.fightData.textData
    }
  }

  doAttack () {
    this.fightData.damage = 0
    if (this.fightData.weapons[0]) {
      this.fightData.hasWeapon = true
      this.fightData.miss = false
      if (Math.random() <= this.fightData.numAttacks) {
        this.fightData.damage = this.fightData.weapons[this.fightData.currentWeapon].stats.getValue('damage')
        this.fightData.damage *= (1 + this.fightData.weapons[this.fightData.currentWeapon].stats.getValue('damage-multiplier'))

        this.fightData.attackerIndex = this.getCurrentAttackerIndex()
        this.fightData.defenderIndex = this.getCurrentDefenderIndex()

        this.fightData = modifierHandler.apply(this.fightData)

        if (this.fightData.damage < 1) {
          this.fightData.damage = 1
        }

        this.fightData.damage = Math.round(this.fightData.damage)
        this.fightData.defender.currentHP -= this.fightData.damage
      } else {
        this.fightData.miss = true
      }
    } else {
      this.fightData.hasWeapon = false
    }
  }

  getCurrentDefenderIndex () {
    let currentDefenderIndex = 0
    if (this.fightData.playerStates[this.fightData.turn + 1]) {
      currentDefenderIndex = this.fightData.turn + 1
    }
    return currentDefenderIndex
  }

  getCurrentAttackerIndex () {
    return this.fightData.turn
  }

  checkTick () {
    let defender = this.getCurrentDefenderIndex()
    if (this.fightData.playerStates[defender].buffs.length > 0) {
      return true
    }
    return false
  }

  tick () {
    let resp = {}
    this.fightData.defenderIndex = this.getCurrentDefenderIndex()

    this.fightData.dots = {}
    this.fightData = modifierHandler.tick(this.fightData)

    let totalDamage = 0
    Object.entries(this.fightData.dots).forEach(([dot, obj]) => {
      totalDamage += obj.damage
    })

    this.fightData.playerStates[this.getCurrentDefenderIndex()].currentHP -= Math.round(totalDamage)

    resp = {
      type: 'buff',
      playerStates: this.fightData.playerStates.map(s => ({
        currentHP: s.currentHP,
        maxHP: s.maxHP,
        id: s.player.id,
        buffs: s.buffs
      })),
      attacker: this.getCurrentAttackerIndex(),
      playerDamaged: this.getCurrentDefenderIndex(),
      dots: this.fightData.dots
    }

    if (this.fightData.playerStates[this.getCurrentDefenderIndex()].currentHP <= 0) {
      resp.done = true
    }

    return resp
  }
}
