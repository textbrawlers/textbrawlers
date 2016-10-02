import * as SMath from 'common/api/specmath.js'
import fs from 'fs'
import modifierHandler from './modifierHandler.js'

export default class Fight {
  constructor (players) {
    this.logbook = []

    this.playerStates = players.map(player => ({
      currentHP: Math.round(player.getStat('max-health').value),
      maxHP: Math.round(player.getStat('max-health').value),
      player: player,
      buffs: []
    }))

    this.turn = luckWeightLifter(players)
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
      this.log('ID: ' + this.attackId + '. Starting a dotattack.')
      resp = this.doBuffs()
      this.buffRound = false
    } else {
      this.log('ID: ' + this.attackId + '. Starting an attack.')
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
    this.log('ID: ' + this.attackId + '. Attack initialized, player ' + this.attackerNum + ' is the attacker.')
  }

  endAttack () {
    this.numAttacks -= 1
    if (this.numAttacks <= 0) {
      this.currentWeapon++
      if (!this.weapons[this.currentWeapon]) {
        this.log('ID: ' + this.attackId + '. Player has no more weapons.')
        this.buffRound = true
        this.log('ID: ' + this.attackId + '. Setting dotround: true.')
        this.turn++
        this.currentWeapon = 0
        if (!this.playerStates[this.turn]) {
          this.turn = 0
        }
        this.log('ID: ' + this.attackId + '. Attack ended.')
      } else {
        this.log('ID: ' + this.attackId + '. Player is using another weapon.')
      }
    } else {
      this.log('ID: ' + this.attackId + '. Hit chance remaining: ' + this.numAttacks + '.')
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
        this.log('ID: ' + this.attackId + '. Player hit the enemy.')

        this.damage = this.weapons[this.currentWeapon].stats.getValue('damage')
        this.log('ID: ' + this.attackId + '. Base damage = ' + this.damage + '.')
        this.damage *= (1 + this.weapons[this.currentWeapon].stats.getValue('damage-multiplier'))
        this.log('ID: ' + this.attackId + '. Applying multiplier, current damage = ' + this.damage + '.')

        let fightData = updateFightData()

        let applyResp = modifierHandler.apply(fightData)

        this.damage = applyResp.damage
        this.blocked = applyResp.blocked
        if (applyResp.crits) {
          this.crits = applyResp.crits
        }
        if (applyResp.arcaneDamage)
          this.arcaneDamage = applyResp.arcaneDamage
        }

        // Special Modifiers
        this.applyArcane()

        // Dot Modifiers
        this.applyBleed()
        this.applyPoison()
        this.applyStun()
        this.applyBurn(this.damage)

        this.damage = Math.round(this.damage)
        this.defender.currentHP -= this.damage
      } else {
        this.miss = true
        this.log('ID: ' + this.attackId + '. Player missed.')
      }
    } else {
      this.hasWeapon = false
      this.log('ID: ' + this.attackId + '. This scrub has no weapons.')
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

  updateFightData() {
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

  applyStun () {
    const defender = this.getCurrentDefenderIndex()
    if (Math.random() < this.weapons[this.currentWeapon].stats.getValue('stun-chance')) {
      this.playerStates[defender].buffs.push({type: 'stun'})
      this.log('ID: ' + this.attackId + '. Stun, applied.')
    } else {
      this.log('ID: ' + this.attackId + '. Stun, failed to apply.')
    }
  }

  applyBurn (baseDamage) {
    const defender = this.getCurrentDefenderIndex()
    const weapon = this.weapons[this.currentWeapon]

    if (Math.random() < weapon.stats.getValue('burn-chance')) {
      const oldBuffs = this.playerStates[defender].buffs
      this.log('ID: ' + this.attackId + '. Burn, succeded.')

      if (oldBuffs.find(buff => buff.type === 'burn')) {
        this.log('ID: ' + this.attackId + '. Burn, dot exists.')
        const buffIndex = oldBuffs.findIndex(buff => buff.type === 'burn')

        if (oldBuffs[buffIndex].damage < weapon.stats.getValue('burn-damage')) {
          this.log('ID: ' + this.attackId + '. Burn, new dot is stronger, applying.')
          const newBuff = {
            type: 'burn',
            duration: 3,
            baseDmg: baseDamage,
            damageMult: weapon.stats.getValue('burn-damage')
          }
          this.playerStates[defender].buffs[buffIndex] = newBuff
        } else {
          this.log('ID: ' + this.attackId + '. Burn, old dot is stronger.')
        }
      } else {
        this.log('ID: ' + this.attackId + '. Burn, dot not found, applying.')
        const newBuff = {
          type: 'burn',
          duration: 3,
          baseDmg: baseDamage,
          damageMult: weapon.stats.getValue('burn-damage')
        }
        this.playerStates[defender].buffs.push(newBuff)
      }
    } else {
      this.log('ID: ' + this.attackId + '. Burn, failed.')
    }
  }

  applyArcane () {
    const defender = this.getCurrentDefenderIndex()
    const chance = this.weapons[this.currentWeapon].stats.getValue('arcane-chance')

    if (Math.random() < chance) {
      this.log('ID: ' + this.attackId + '. Arcane, succeded.')
      const oldBuffs = this.playerStates[defender].buffs
      const weapon = this.weapons[this.currentWeapon]

      if (oldBuffs.find(buff => buff.type === 'arcane')) {
        this.log('ID: ' + this.attackId + '. Arcane, dot exists.')
        const buffIndex = oldBuffs.findIndex(buff => buff.type === 'arcane')
        let damage = oldBuffs[buffIndex].damage
        let currentStacks = oldBuffs[buffIndex].stacks

        if (currentStacks >= 4) {
          this.log('ID: ' + this.attackId + '. Arcane, maximum stacks, exploding.')
          this.damage += oldBuffs[buffIndex].storedDmg
          this.arcaneDamage = oldBuffs[buffIndex].storedDmg
          this.playerStates[defender].buffs.splice(buffIndex, 1)
        } else if (damage < weapon.stats.getValue('arcane-damage')) {
          const newBuff = {
            type: 'arcane',
            stacks: currentStacks + 1,
            damage: weapon.stats.getValue('arcane-damage'),
            storedDmg: oldBuffs[buffIndex].storedDmg
          }
          this.playerStates[defender].buffs[buffIndex] = newBuff
          this.log('ID: ' + this.attackId + '. Arcane, new dot is stronger, applying. Stacks: ' + newBuff.stacks + '.')
        } else {
          this.playerStates[defender].buffs[buffIndex].stacks++
          this.log('ID: ' + this.attackId + '. Arcane, old dot is stronger. Stacks: ' + this.playerStates[defender].buffs[buffIndex].stacks + '.')
        }
      } else {
        this.log('ID: ' + this.attackId + '. Arcane, dot not found, applying. Stacks: 1.')
        const newBuff = {
          type: 'arcane',
          stacks: 1,
          damage: weapon.stats.getValue('arcane-damage'),
          storedDmg: 0
        }
        this.playerStates[defender].buffs.push(newBuff)
      }
    } else {
      this.log('ID: ' + this.attackId + '. Arcane, failed.')
    }
  }

  checkBuffs () {
    let defender = this.getCurrentDefenderIndex()
    if (this.playerStates[defender].buffs.length > 0) {
      return true
    }
    this.log('ID: ' + this.attackId + '. No dots found, skipping dotattack.')
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
    this.log('ID: ' + this.attackId + '. Dots found: ' + this.playerStates[defender].buffs.length + '.')
    while (this.playerStates[defender].buffs[index]) {
      let currentBuff = this.playerStates[defender].buffs[index]
      if (currentBuff.type === 'bleed') {
        this.log('ID: ' + this.attackId + '. Bleed found, duration remaining: ' + currentBuff.duration + '.')
        bleedDamage++
        if (currentBuff.duration <= 0) {
          this.playerStates[defender].buffs.splice(index, 1)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
      } else if (currentBuff.type === 'poison') {
        this.log('ID: ' + this.attackId + '. Poison found, duration remaining: ' + currentBuff.duration + '.')
        poisonDamage = currentBuff.damage
        if (currentBuff.duration <= 0) {
          this.playerStates[defender].buffs.splice(index, 1)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
        poisonDuration = currentBuff.duration--
      } else if (currentBuff.type === 'burn') {
        this.log('ID: ' + this.attackId + '. Burn found, duration remaining: ' + currentBuff.duration + '.')
        burnDamage = Math.round(currentBuff.damageMult * currentBuff.baseDmg)
        if (currentBuff.duration <= 0) {
          this.playerStates[defender].buffs.splice(index, 1)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
        burnDuration = currentBuff.duration--
      } else if (currentBuff.type === 'arcane') {
        this.log('ID: ' + this.attackId + '. Arcane found, stacks: ' + currentBuff.stacks + '.')
        arcaneDamage = 1
        this.playerStates[defender].buffs[index].storedDmg += currentBuff.damage--
        index++
        arcaneStacks = currentBuff.stacks
      } else if (currentBuff.type === 'stun') {
        this.log('ID: ' + this.attackId + '. Stun found, removing.')
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

  log (text) {
    this.logbook.push(text)
    // console.log(text)
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
