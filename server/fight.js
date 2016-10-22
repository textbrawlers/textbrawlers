import * as SMath from 'common/api/specmath.js'
import modifierHandler from './modifierHandler.js'

let fightData = {}

export default class Fight {
  constructor (players) {
    let playerStates = players.map(player => ({
      currentHP: Math.round(player.getStat('max-health').value),
      maxHP: Math.round(player.getStat('max-health').value),
      player: player,
      buffs: []
    }))

    fightData = {
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
    fightData.attackId++
    let resp
    fightData.buffRound = this.checkTick() ? fightData.buffRound : false
    if (fightData.buffRound) {
      resp = this.tick()
      fightData.buffRound = false
    } else {
      this.initAttack()
      this.doAttack()
      resp = this.createResponse()
      this.endAttack()

      if (fightData.defender.currentHP <= 0) {
        resp.done = true
      }
    }
    return resp
  }

  initAttack () {
    fightData.textData = {}

    fightData.attackerNum = fightData.turn
    fightData.defenderNum = fightData.playerStates[fightData.turn + 1] ? fightData.turn + 1 : 0

    fightData.attacker = fightData.playerStates[fightData.attackerNum]
    fightData.defender = fightData.playerStates[fightData.defenderNum]

    fightData.weapons = fightData.attacker.player.weaponStats

    if (fightData.weapons.length > 0) {
      if (fightData.numAttacks <= 0) {
        fightData.numAttacks = fightData.weapons[fightData.currentWeapon].stats.getValue('attack-speed')
        fightData = modifierHandler.weaponChange(fightData)
      }
      fightData = modifierHandler.init(fightData)
    }
  }

  endAttack () {
    fightData = modifierHandler.end(fightData)
    fightData.numAttacks -= 1
    if (fightData.numAttacks <= 0) {
      fightData.currentWeapon++
      if (!fightData.weapons[fightData.currentWeapon]) {
        fightData.buffRound = true
        fightData.turn++
        fightData.currentWeapon = 0
        if (!fightData.playerStates[fightData.turn]) {
          fightData.turn = 0
        }
      }
    }
  }

  createResponse () {
    fightData.textData.hasWeapon = fightData.hasWeapon
    fightData.textData.missed = fightData.miss

    return {
      type: 'regular',
      playerStates: fightData.playerStates.map(s => ({
        currentHP: s.currentHP,
        maxHP: s.maxHP,
        id: s.player.id,
        buffs: s.buffs
      })),
      damage: fightData.damage,
      attacker: fightData.attackerNum,
      defender: fightData.defenderNum,
      weapon: fightData.currentWeapon,
      textData: fightData.textData
    }
  }

  doAttack () {
    fightData.damage = 0
    if (fightData.weapons[0]) {
      fightData.hasWeapon = true
      if (this.findAmmo()) {
        fightData.miss = false
        if (Math.random() <= fightData.numAttacks) {
          fightData.damage = fightData.weapons[fightData.currentWeapon].stats.getValue('damage')
          fightData.damage *= (1 + fightData.weapons[fightData.currentWeapon].stats.getValue('damage-multiplier'))

          fightData.attackerIndex = this.getCurrentAttackerIndex()
          fightData.defenderIndex = this.getCurrentDefenderIndex()

          fightData = modifierHandler.apply(fightData)

          if (fightData.damage < 1) {
            fightData.damage = 1
          }

          fightData.damage = Math.round(fightData.damage)
          fightData.defender.currentHP -= fightData.damage
        } else {
          fightData.miss = true
        }
      } else {
        fightData.ammo = false
        console.log('No ammo')
      }
    } else {
      fightData.hasWeapon = false
    }
  }

  findAmmo () {
    let result = true
    const weapon = fightData.weapons[fightData.currentWeapon]
    if (weapon.stats.getValue('required-ammo')) {
      result = false
      const neededAmmoType = weapon.stats.getValue('required-ammo')
      Object.entries(fightData.attacker.player.equipped.inventory).find(([slot, item]) => {
        if (item.type === neededAmmoType) {
          result = true
        }
      })
    }
    return result
  }

  getCurrentDefenderIndex () {
    let currentDefenderIndex = 0
    if (fightData.playerStates[fightData.turn + 1]) {
      currentDefenderIndex = fightData.turn + 1
    }
    return currentDefenderIndex
  }

  getCurrentAttackerIndex () {
    return fightData.turn
  }

  checkTick () {
    let defender = this.getCurrentDefenderIndex()
    if (fightData.playerStates[defender].buffs.length > 0) {
      return true
    }
    return false
  }

  tick () {
    let resp = {}
    fightData.defenderIndex = this.getCurrentDefenderIndex()

    fightData.dots = {}
    fightData = modifierHandler.tick(fightData)

    let totalDamage = 0
    Object.entries(fightData.dots).forEach(([dot, obj]) => {
      totalDamage += obj.damage
    })

    fightData.playerStates[this.getCurrentDefenderIndex()].currentHP -= Math.round(totalDamage)

    resp = {
      type: 'buff',
      playerStates: fightData.playerStates.map(s => ({
        currentHP: s.currentHP,
        maxHP: s.maxHP,
        id: s.player.id,
        buffs: s.buffs
      })),
      attacker: this.getCurrentAttackerIndex(),
      playerDamaged: this.getCurrentDefenderIndex(),
      dots: fightData.dots
    }

    if (fightData.playerStates[this.getCurrentDefenderIndex()].currentHP <= 0) {
      resp.done = true
    }

    return resp
  }
}
