import * as SMath from 'common/api/specmath.js'
import fs from 'fs'
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
      const playerLuckValue = player.getStat('luck').value
      if (playerLuckValue) {
        maxWeight += 10 * (1 + playerLuckValue)
      } else {
        maxWeight += 10
      }
    })
    const weight = SMath.randomInt(maxWeight)
    let currWeight = 0
    const index = players.findIndex(player => {
      const playerLuckValue = player.getStat('luck').value
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
    this.fightData.buffRound = this.checkBuffs() ? this.fightData.buffRound : false
    if (this.fightData.buffRound) {
      resp = this.doBuffs()
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
    this.fightData.attackerNum = this.turn
    this.fightData.defenderNum = this.playerStates[this.turn + 1] ? this.turn + 1 : 0

    this.fightData.attacker = this.fightData.playerStates[this.fightData.attackerNum]
    this.fightData.defender = this.fightData.playerStates[this.fightData.defenderNum]

    this.fightData.weapons = this.fightData.attacker.player.weaponStats

    if (this.fightData.numAttacks <= 0) {
      this.fightData.numAttacks = this.fightData.weapons[this.fightData.currentWeapon].stats.getValue('attack-speed')
      if (this.fightData.attacker.buffs.find(b => b.type === 'stun')) {
        this.fightData.numAttacks /= 2
      }
    }
  }

  endAttack () {
    this.fightData.numAttacks -= 1
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
      hasWeapon: this.fightData.hasWeapon,
      missed: this.fightData.miss,
      blocked: this.fightData.blocked,
      crit: this.fightData.crits,
      arcaneDamage: this.fightData.arcaneDamage,
      weapon: this.fightData.currentWeapon
    }
  }

  doAttack () {
    if (this.fightData.weapons[0]) {
      this.fightData.hasWeapon = true
      this.fightData.miss = false
      this.fightData.crits = 0
      this.fightData.damage = 0
      this.fightData.arcaneDamage = 0
      if (Math.random() <= this.fightData.numAttacks) {
        this.fightData.damage = this.fightData.weapons[this.fightData.currentWeapon].stats.getValue('damage')
        this.fightData.damage *= (1 + this.fightData.weapons[this.fightData.currentWeapon].stats.getValue('damage-multiplier'))

        this.fightData.attackerIndex = this.getCurrentAttackerIndex()
        this.fightData.defenderIndex = this.getCurrentDefenderIndex()

        this.fightData = modifierHandler.apply(this.fightData)

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

  checkBuffs () {
    let defender = this.getCurrentDefenderIndex()
    if (this.fightData.playerStates[defender].buffs.length > 0) {
      return true
    }
    return false
  }

  doBuffs () {
    let bleedDamage = 0
    let poisonDamage = 0
    let poisonDuration = 0
    let burnDamage = 0
    let burnDuration = 0
    let arcaneDamage = 0
    let arcaneStacks = 0

    let defender = this.getCurrentDefenderIndex()
    let index = 0
    while (this.fightData.playerStates[defender].buffs[index]) {
      let currentBuff = this.fightData.playerStates[defender].buffs[index]
      if (currentBuff.type === 'bleed') {
        bleedDamage++
        if (currentBuff.duration <= 0) {
          this.fightData.playerStates[defender].buffs.splice(index, 1)
        } else {
          this.fightData.playerStates[defender].buffs[index].duration--
          index++
        }
      } else if (currentBuff.type === 'poison') {
        poisonDamage = currentBuff.damage
        if (currentBuff.duration <= 0) {
          this.fightData.playerStates[defender].buffs.splice(index, 1)
        } else {
          this.fightData.playerStates[defender].buffs[index].duration--
          index++
        }
        poisonDuration = currentBuff.duration--
      } else if (currentBuff.type === 'burn') {
        burnDamage = Math.round(currentBuff.damageMult * currentBuff.baseDmg)
        if (currentBuff.duration <= 0) {
          this.fightData.playerStates[defender].buffs.splice(index, 1)
        } else {
          this.fightData.playerStates[defender].buffs[index].duration--
          index++
        }
        burnDuration = currentBuff.duration--
      } else if (currentBuff.type === 'arcane') {
        arcaneDamage = 1
        this.fightData.playerStates[defender].buffs[index].storedDmg += currentBuff.damage--
        index++
        arcaneStacks = currentBuff.stacks
      } else if (currentBuff.type === 'stun') {
        this.fightData.playerStates[defender].buffs.splice(index, 1)
      }
    }

    let totalDamage = bleedDamage + poisonDamage + burnDamage + arcaneDamage
    this.fightData.playerStates[defender].currentHP -= Math.round(totalDamage)

    return {
      type: 'buff',
      playerStates: this.fightData.playerStates.map(s => ({
        currentHP: s.currentHP,
        maxHP: s.maxHP,
        id: s.player.id,
        buffs: s.buffs
      })),
      attacker: this.getCurrentAttackerIndex(),
      playerDamaged: defender,
      bleedDamage: bleedDamage,
      poisonDamage: poisonDamage,
      poisonDuration: poisonDuration,
      burnDamage: burnDamage,
      burnDuration: burnDuration,
      arcaneDamage: arcaneDamage,
      arcaneStacks: arcaneStacks
    }
  }

  writeLog (fightKey) {
    const logString = `${this.logbook.join('\r\n')}`
    fs.writeFile('./logs/fight-' + fightKey + '.log', logString, function (err) {
      if (err) {
        console.log(err.stack || err)
      } else {
        console.log('Log written successfully.')
      }
    })
  }
}
