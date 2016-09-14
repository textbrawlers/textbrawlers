import * as SMath from 'common/api/specmath'
import fs from 'fs'

export default class Fight {
  constructor (players, key) {
    this.key = key
    this.log = []

    this.playerStates = players.map(player => ({
      currentHP: Math.round(player.getStat('max-health').value),
      maxHP: Math.round(player.getStat('max-health').value),
      player: player,
      buffs: []
    }))

    this.turn = SMath.randomInt(this.playerStates.length)
    this.currentWeapon = 0
    this.numAttacks = 0
    this.attackId = 0
  }

  luckWeightLifter(players) {
    this.log.push('Doing weight lifting.')
    let maxWeight = 0
    players.forEach(player => {
      const playerLuckValue = player.getStat('luck').value
      if (playerLuckValue){
        maxWeight += 10 * (1 + playerLuckValue)
      } else {
        maxWeight += 10
      }
    })
    const weight = SMath.randomInt(maxWeight)
    let currWeight = 0
    const index = players.findIndex(player => {
      const playerLuckValue = player.getStat('luck').value
      if (playerLuckValue){
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
    if (this.buffRound && this.checkBuffs()) {
      this.log.push('ID: ' + this.attackId + '. Starting a dotattack.')
      resp = this.doBuffs()
      this.buffRound = false
    } else {
      this.log.push('ID: ' + this.attackId + '. Starting an attack.')
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
    }
    this.log.push('ID: ' + this.attackId + '. Attack initialized, player ' + this.attackerNum + ' is the attacker.')
  }

  endAttack () {
    this.numAttacks -= 1
    if (this.numAttacks <= 0) {
      this.currentWeapon++
      if (!this.weapons[this.currentWeapon]) {
        this.log.push('ID: ' + this.attackId + '. Player has no more weapons.')
        this.buffRound = true
        this.log.push('ID: ' + this.attackId + '. Setting buffRound: true.')
        this.turn++
        this.currentWeapon = 0
        if (!this.playerStates[this.turn]) {
          this.turn = 0
        }
      }else{
        this.log.push('ID: ' + this.attackId + '. Player is using another weapon.')
      }
    }else{
      this.log.push('ID: ' + this.attackId + '. Hit chance remaining: ' + this.numAttacks + '.')
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
    if(this.weapons[0]){
      this.hasWeapon = true
      this.miss = false
      this.crits = 0
      this.damage = 0
      this.arcaneDamage = 0
      if (Math.random() <= this.numAttacks) {
        this.log.push('ID: ' + this.attackId + '. Player ' + this.getCurrentAttackerIndex() + ' hit the enemy.')

        this.damage = this.weapons[this.currentWeapon].stats.getValue('damage')
        this.log.push('ID: ' + this.attackId + '. Base damage = ' + this.damage + '.')
        this.damage *= (1 + this.weapons[this.currentWeapon].stats.getValue('damage-multiplier'))
        this.log.push('ID: ' + this.attackId + '. Applying multiplier, current damage = ' + this.damage + '.')

        //Normal Modifiers
        this.applyCrit()
        this.applyBlock()

        //Special Modifiers
        this.applyArcane()

        //Dot Modifiers
        this.applyBleed()
        this.applyPoison()
        this.applyStun()
        this.applyBurn(this.damage)

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

  applyBlock () {
    this.blocked = false
    if (Math.random() < this.defender.player.getStat('block-chance').value) {
      this.blocked = true
      this.damage *= this.defender.player.getStat('block-multiplier').value
    }
  }

  applyCrit () {
    const weapon = this.weapons[this.currentWeapon]

    if (Math.random() < weapon.stats.getValue('crit-chance')) {
      this.crits = 1
      if (Math.random() < weapon.stats.getValue('crit-chance') - 1) {
        this.crits = 2
        this.damage *= (1 + (1.5 * weapon.stats.getValue('crit-damage')))
        this.log.push('ID: ' + this.attackId + '. Applying red crit, current damage = ' + this.damage + '.')
      } else {
        this.damage *= (1 + weapon.stats.getValue('crit-damage'))
        this.log.push('ID: ' + this.attackId + '. Applying crit, current damage = ' + this.damage + '.')
      }
    }else{
      this.log.push('ID: ' + this.attackId + '. No crit, current damage = ' + this.damage + '.')
    }
  }

  applyBleed () {
    const defender = this.getCurrentDefenderIndex()
    const weapon = this.weapons[this.currentWeapon]

    if (Math.random() <= weapon.stats.getValue('bleed-chance')) {
      let bleedStack = {type: 'bleed', duration: weapon.stats.getValue('bleed-duration')}
      this.playerStates[defender].buffs.push(bleedStack)
      this.log.push('ID: ' + this.attackId + '. Bleed, applied.')
    }else{
      this.log.push('ID: ' + this.attackId + '. Bleed, failed to apply.')
    }
  }

  applyPoison () {
    const defender = this.getCurrentDefenderIndex()
    const oldBuffs = this.playerStates[defender].buffs
    const weapon = this.weapons[this.currentWeapon]

    if (oldBuffs.find(buff => buff.type === 'poison')) {
      this.log.push('ID: ' + this.attackId + '. Poison, dot found.')
      const buffIndex = oldBuffs.findIndex(buff => buff.type === 'poison')

      if (oldBuffs[buffIndex].damage < weapon.stats.getValue('poison-damage')) {
        this.log.push('ID: ' + this.attackId + '. Poison, new dot is stronger, applying.')
        const newBuff = {
          type: 'poison',
          duration: weapon.stats.getValue('poison-duration'),
          damage: weapon.stats.getValue('poison-damage')
        }
        this.playerStates[defender].buffs[buffIndex] = newBuff
      } else {
        this.log.push('ID: ' + this.attackId + '. Poison, old dot is stonger.')
      }
    } else {
      const newBuff = {
        type: 'poison',
        duration: weapon.stats.getValue('poison-duration'),
        damage: weapon.stats.getValue('poison-damage')
      }
      this.playerStates[defender].buffs.push(newBuff)
      this.log.push('ID: ' + this.attackId + '. Poison, dot not found, applying.')
    }
  }

  applyStun () {
    const defender = this.getCurrentDefenderIndex()
    if (Math.random() < this.weapons[this.currentWeapon].stats.getValue('stun-chance')) {
      this.playerStates[defender].buffs.push({type: 'stun'})
      this.log.push('ID: ' + this.attackId + '. Stun, applied.')
    } else {
      this.log.push('ID: ' + this.attackId + '. Stun, failed to apply.')
    }
  }

  applyBurn (baseDamage) {
    const defender = this.getCurrentDefenderIndex()
    const weapon = this.weapons[this.currentWeapon]

    if (Math.random() < weapon.stats.getValue('burn-chance')) {
      const oldBuffs = this.playerStates[defender].buffs
      this.log.push('ID: ' + this.attackId + '. Burn, succeded.')

      if (oldBuffs.find(buff => buff.type === 'burn')) {
        this.log.push('ID: ' + this.attackId + '. Burn, dot exists.')
        const buffIndex = oldBuffs.findIndex(buff => buff.type === 'burn')

        if (oldBuffs[buffIndex].damage < weapon.stats.getValue('burn-damage')) {
          this.log.push('ID: ' + this.attackId + '. Burn, new dot is stronger, applying.')
          const newBuff = {type: 'burn',
            duration: 3,
            baseDmg: baseDamage,
            damageMult: weapon.stats.getValue('burn-damage')
          }
          this.playerStates[defender].buffs[buffIndex] = newBuff
        }else{
          this.log.push('ID: ' + this.attackId + '. Burn, old dot is stronger.')
        }
      } else {
        this.log.push('ID: ' + this.attackId + '. Burn, dot not found, applying.')
        const newBuff = {type: 'burn',
          duration: 3,
          baseDmg: baseDamage,
          damageMult: weapon.stats.getValue('burn-damage')
        }
        this.playerStates[defender].buffs.push(newBuff)
      }
    }else{
      this.log.push('ID: ' + this.attackId + '. Burn, failed.')
    }
  }

  applyArcane () {
    const defender = this.getCurrentDefenderIndex()
    const chance = this.weapons[this.currentWeapon].stats.getValue('arcane-chance')

    if (Math.random() < chance) {
      this.log.push('ID: ' + this.attackId + '. Arcane, succeded.')
      const oldBuffs = this.playerStates[defender].buffs
      const weapon = this.weapons[this.currentWeapon]

      if (oldBuffs.find(buff => buff.type === 'arcane')) {
        this.log.push('ID: ' + this.attackId + '. Arcane, dot exists.')
        const buffIndex = oldBuffs.findIndex(buff => buff.type === 'arcane')
        let damage = oldBuffs[buffIndex].damage
        let currentStacks = oldBuffs[buffIndex].stacks

        if (currentStacks >= 4) {
          this.log.push('ID: ' + this.attackId + '. Arcane, maximum stacks, exploding.')
          this.damage += oldBuffs[buffIndex].storedDmg
          this.arcaneDamage = oldBuffs[buffIndex].storedDmg
          this.playerStates[defender].buffs.splice(buffIndex, 1)
        } else if (damage < weapon.stats.getValue('arcane-damage')) {
          this.log.push('ID: ' + this.attackId + '. Arcane, new dot is stronger, applying.')
          const newBuff = {type: 'arcane',
            stacks: currentStacks++,
            damage: weapon.stats.getValue('arcane-damage'),
            storedDmg: oldBuffs[buffIndex].storedDmg
          }
          this.playerStates[defender].buffs[buffIndex] = newBuff
        } else {
          this.log.push('ID: ' + this.attackId + '. Arcane, old dot is stronger.')
          this.playerStates[defender].buffs[buffIndex].stacks++
        }
      } else {
        this.log.push('ID: ' + this.attackId + '. Arcane, dot not found, applying.')
        const newBuff = {type: 'arcane',
          stacks: 1,
          damage: weapon.stats.getValue('arcane-damage'),
          storedDmg: 0
        }
        this.playerStates[defender].buffs.push(newBuff)
      }
    }else{
      this.log.push('ID: ' + this.attackId + '. Arcane, failed.')
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
    this.log.push('ID: ' + this.attackId + '. Dots found: ' + this.playerStates[defender].buffs.length + '.')
    while (this.playerStates[defender].buffs[index]) {
      let currentBuff = this.playerStates[defender].buffs[index]
      if (currentBuff.type === 'bleed') {
        this.log.push('ID: ' + this.attackId + '. Bleed found, duration remaining: ' + currentBuff.duration + '.')
        bleedDamage++
        if (currentBuff.duration <= 0) {
          this.playerStates[defender].buffs.splice(index)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
      } else if (currentBuff.type === 'poison') {
        this.log.push('ID: ' + this.attackId + '. Poison found, duration remaining: ' + currentBuff.duration + '.')
        poisonDamage = currentBuff.damage
        if (currentBuff.duration <= 0) {
          this.playerStates[defender].buffs.splice(index)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
        poisonDuration = currentBuff.duration--
      } else if (currentBuff.type === 'burn') {
        this.log.push('ID: ' + this.attackId + '. Burn found, duration remaining: ' + currentBuff.duration + '.')
        burnDamage = Math.round(currentBuff.damageMult * currentBuff.baseDmg)
        if (currentBuff.duration <= 0) {
          this.playerStates[defender].buffs.splice(index)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
        burnDuration = currentBuff.duration--
      } else if (currentBuff.type === 'arcane') {
        this.log.push('ID: ' + this.attackId + '. Arcane found, stacks: ' + currentBuff.stacks + '.')
        arcaneDamage = 1
        this.playerStates[defender].buffs[index].storedDmg += currentBuff.damage--
        index++
        arcaneStacks = currentBuff.stacks
      }
    }

    let totalDamage = bleedDamage + poisonDamage + burnDamage + arcaneDamage
    this.defender.currentHP -= Math.round(totalDamage)

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

  writeLog(){
    const logString = `${this.log.join('\r\n')}`
    fs.writeFile("./logs/fight-" + this.key + ".log", logString, function(err){
      if (err) {
        console.log(err)
      } else {
        console.log('Log written successfully.')
      }
    })
  }
}
