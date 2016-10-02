import * as SMath from 'common/api/specmath.js'
import fs from 'fs'
import modifierHandler from './modifierHandler.js'

export default class Fight {
  constructor (players) {
    this.playerStates = players.map(player => ({
      currentHP: Math.round(player.getStat('max-health').value),
      maxHP: Math.round(player.getStat('max-health').value),
      player: player,
      buffs: []
    }))

    this.turn = this.luckWeightLifter(players)
    this.currentWeapon = 0
    this.numAttacks = 0
    this.attackId = 0
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
    this.attackId++
    let resp
    this.buffRound = this.checkBuffs() ? this.buffRound : false
    if (this.buffRound) {
      resp = this.doBuffs()
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
    this.attackerNum = this.turn
    this.defenderNum = this.playerStates[this.turn + 1] ? this.turn + 1 : 0

    this.attacker = this.playerStates[this.attackerNum]
    this.defender = this.playerStates[this.defenderNum]

    this.weapons = this.attacker.player.weaponStats

    if (this.numAttacks <= 0) {
      this.numAttacks = this.weapons[this.currentWeapon].stats.getValue('attack-speed')
      if (this.attacker.buffs.find(b => b.type === 'stun')) {
        this.numAttacks /= 2
      }
    }
  }

  endAttack () {
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
      hasWeapon: this.hasWeapon,
      missed: this.miss,
      blocked: this.blocked,
      crit: this.crits,
      arcaneDamage: this.arcaneDamage,
      weapon: this.currentWeapon
    }
  }

  doAttack () {
    if (this.weapons[0]) {
      this.hasWeapon = true
      this.miss = false
      this.crits = 0
      this.damage = 0
      this.arcaneDamage = 0
      if (Math.random() <= this.numAttacks) {
        this.damage = this.weapons[this.currentWeapon].stats.getValue('damage')
        this.damage *= (1 + this.weapons[this.currentWeapon].stats.getValue('damage-multiplier'))

        let fightData = this.updateFightData()

        let applyResp = modifierHandler.apply(fightData)

        this.damage = applyResp.damage
        this.blocked = applyResp.blocked
        if (applyResp.crits) {
          this.crits = applyResp.crits
        }
        if (applyResp.arcaneDamage) {
          this.arcaneDamage = applyResp.arcaneDamage
        }

        this.damage = Math.round(this.damage)
        this.defender.currentHP -= this.damage
      } else {
        this.miss = true
      }
    } else {
      this.hasWeapon = false
    }
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

  updateFightData () {
    return {
      playerStates: this.playerStates,
      attackerIndex: this.getCurrentAttackerIndex(),
      defenderIndex: this.getCurrentDefenderIndex(),
      attacker: this.attacker,
      defender: this.defender,
      weapons: this.weapons,
      currentWeapon: this.currentWeapon,
      crits: this.crits,
      damage: this.damage,
      arcaneDamage: this.arcaneDamage
    }
  }

  checkBuffs () {
    let defender = this.getCurrentDefenderIndex()
    if (this.playerStates[defender].buffs.length > 0) {
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
    while (this.playerStates[defender].buffs[index]) {
      let currentBuff = this.playerStates[defender].buffs[index]
      if (currentBuff.type === 'bleed') {
        bleedDamage++
        if (currentBuff.duration <= 0) {
          this.playerStates[defender].buffs.splice(index, 1)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
      } else if (currentBuff.type === 'poison') {
        poisonDamage = currentBuff.damage
        if (currentBuff.duration <= 0) {
          this.playerStates[defender].buffs.splice(index, 1)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
        poisonDuration = currentBuff.duration--
      } else if (currentBuff.type === 'burn') {
        burnDamage = Math.round(currentBuff.damageMult * currentBuff.baseDmg)
        if (currentBuff.duration <= 0) {
          this.playerStates[defender].buffs.splice(index, 1)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
        burnDuration = currentBuff.duration--
      } else if (currentBuff.type === 'arcane') {
        arcaneDamage = 1
        this.playerStates[defender].buffs[index].storedDmg += currentBuff.damage--
        index++
        arcaneStacks = currentBuff.stacks
      } else if (currentBuff.type === 'stun') {
        this.playerStates[defender].buffs.splice(index, 1)
      }
    }

    let totalDamage = bleedDamage + poisonDamage + burnDamage + arcaneDamage
    this.playerStates[defender].currentHP -= Math.round(totalDamage)

    return {
      type: 'buff',
      playerStates: this.playerStates.map(s => ({
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
