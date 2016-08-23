import * as SMath from 'common/api/specmath'

export default class Fight {
  constructor (players) {
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

  attack () {
    this.attackId++
    let resp
    if (this.buffRound && this.checkBuffs()) {
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
    this.attacker = this.playerStates[this.turn]
    this.defender = this.playerStates[this.turn + 1] || this.playerStates[0]

    this.weapons = this.attacker.player.weaponStats

    if (this.numAttacks <= 0) {
      this.numAttacks = this.weapons[this.currentWeapon].stats.getValue('attack-speed')
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
        id: s.player.id
      })),
      damage: this.damage,
      attacker: this.turn,
      hasWeapon: this.hasWeapon,
      miss: this.miss,
      crit: this.crits,
      arcaneDamage: this.arcaneDamage
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
        this.damage = this.weapons[this.currentWeapon].stats.getValue('damage')
        this.damage *= (1 + this.weapons[this.currentWeapon].stats.getValue('damage-multiplier'))
        
        //Fury adding and Modifier
        if (this.playerStates[attacker].buffs.find(buff => buff.type === 'fury')) {
          let buffIndex = this.playerStates[attacker].buffs.findIndex(buff => buff.type === 'fury')
          this.damage *= this.playerStates[attacker].buffs[buffIndex].damageMult
        }
        this.applyFury(this.weapons[this.currentWeapon].stats.getValue('fury'))
        
        //Normal Modifiers
        this.applyCrit()
        this.applyBlock()

        //Special Modifiers
        this.applyArcane()

        //Dot Modifiers
        this.applyBleed()
        this.applyPoison()
        this.applyStun()
        this.applyBurn()
        
        this.damage = Math.round(this.damage)
        this.defender.currentHP -= this.damage
      } else {
        this.miss = true
        //Fury removing
        if (this.playerStates[attacker].buffs.find(buff => buff.type === 'fury')) {
          this.resetFury()
        }
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

  getCurrentAttackingIndex () {
    return this.turn
  }

  applyBlock () {
    if (Math.random() < this.defender.player.getStat('block-chance').value){
      this.damage *= this.defender.player.getStat('block-multiplier').value
    }
  }

  applyCrit () {
    if (Math.random() < this.weapons[this.currentWeapon].stats.getValue('crit-chance')) {
      this.crits = 1
      if (Math.random() < this.weapons[this.currentWeapon].stats.getValue('crit-chance') - 1) {
        this.crits = 2
        this.damage *= (1 + (1.5 * this.weapons[this.currentWeapon].stats.getValue('crit-damage')))
      } else {
        this.damage *= (1 + this.weapons[this.currentWeapon].stats.getValue('crit-damage'))
      }
    }
  }

  applyBleed () {
    let defender = this.getCurrentDefenderIndex()
    if (Math.random() <= this.weapons[this.currentWeapon].stats.getValue('bleed-chance')) {
      let bleedStack = {type: 'bleed', duration: this.weapons[this.currentWeapon].stats.getValue('bleed-duration')}
      this.playerStates[defender].buffs.push(bleedStack)
    }
  }

  applyPoison () {
    let defender = this.getCurrentDefenderIndex()
    if (this.playerStates[defender].buffs.find(buff => buff.type === 'poison')) {
      let buffIndex = this.playerStates[defender].buffs.findIndex(buff => buff.type === 'poison')
      if (this.playerStates[defender].buffs[buffIndex].damage < this.weapons[this.currentWeapon].stats.getValue('poison-damage')) {
        const newBuff = {
          type: 'poison',
          duration: this.weapons[this.currentWeapon].stats.getValue('poison-duration'),
          damage: this.weapons[this.currentWeapon].stats.getValue('poison-damage')
        }
        this.playerStates[defender].buffs[buffIndex] = newBuff
      }
    } else {
      const newBuff = {
        type: 'poison',
        duration: this.weapons[this.currentWeapon].stats.getValue('poison-duration'),
        damage: this.weapons[this.currentWeapon].stats.getValue('poison-damage')
      }
      this.playerStates[defender].buffs.push(newBuff)
    }
  }

  applyStun () {
    let defender = this.getCurrentDefenderIndex()
    if (Math.random() < this.weapons[this.currentWeapon].stats.getValue('stun-chance')) {
      this.playerStates[defender].buffs.push({type: 'stun'})
    }
  }

  applyBurn (baseDamage) {
    let defender = this.getCurrentDefenderIndex()
    if (Math.random() < this.weapons[this.currentWeapon].stats.getValue('burn-chance')) {
      if (this.playerStates[defender].buffs.find(buff => buff.type === 'burn')) {
        let buffIndex = this.playerStates[defender].buffs.findIndex(buff => buff.type === 'burn')
        if (this.playerStates[defender].buffs[buffIndex].damage < this.weapons[this.currentWeapon].stats.getValue('burn-damage')) {
          const newBuff = {type: 'burn',
            duration: 3,
            baseDmg: baseDamage,
            damageMult: this.weapons[this.currentWeapon].stats.getValue('burn-damage')
          }
          this.playerStates[defender].buffs[buffIndex] = newBuff
        }
      } else {
        const newBuff = {type: 'burn',
          duration: 3,
          baseDmg: baseDamage,
          damageMult: this.weapons[this.currentWeapon].stats.getValue('burn-damage')
        }
        this.playerStates[defender].buffs.push(newBuff)
      }
    }
  }

  applyArcane () {
    let defender = this.getCurrentDefenderIndex()
    if (Math.random() < this.weapons[this.currentWeapon].stats.getValue('arcane-chance')) {
      if (this.playerStates[defender].buffs.find(buff => buff.type === 'arcane')) {
        let buffIndex = this.playerStates[defender].buffs.findIndex(buff => buff.type === 'arcane')
        let damage = this.playerStates[defender].buffs[buffIndex].damage
        if (damage < this.weapons[this.currentWeapon].stats.getValue('arcane-damage')) {
          let currentStacks = this.playerStates[defender].buffs[buffIndex].stacks
          if (currentStacks >= 4) {
            this.damage += this.playerStates[defender].buffs[buffIndex].storedDmg
            this.arcaneDamage = this.playerStates[defender].buffs[buffIndex].storedDmg
            this.playerStates[defender].buffs.splice(buffIndex, 1)
          } else {
            const newBuff = {type: 'arcane',
              stacks: currentStacks++,
              damage: this.weapons[this.currentWeapon].stats.getValue('arcane-damage'),
              storedDmg: this.playerStates[defender].buffs[buffIndex].storedDmg
            }
            this.playerStates[defender].buffs[buffIndex] = newBuff
          }
        } else {
          this.playerStates[defender].buffs[buffIndex].stacks++
        }
      } else {
        const newBuff = {type: 'arcane',
          stacks: 1,
          damage: this.weapons[this.currentWeapon].stats.getValue('arcane-damage'),
          storedDmg: 0
        }
        this.playerStates[defender].buffs.push(newBuff)
      }
    }
  }
  
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
    let burnDamage = 0
    let arcaneDamage = 0

    let defender = this.getCurrentDefenderIndex()
    let index = 0
    while (this.playerStates[defender].buffs[index]) {
      let currentBuff = this.playerStates[defender].buffs[index]
      if (currentBuff.type === 'bleed') {
        bleedDamage++
        if (currentBuff.duration <= 1) {
          this.playerStates[defender].buffs.splice(index)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
      } else if (currentBuff.type === 'poison') {
        poisonDamage = currentBuff.damage
        if (currentBuff.duration <= 1) {
          this.playerStates[defender].buffs.splice(index)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
      } else if (currentBuff.type === 'burn') {
        burnDamage = (currentBuff.damage + 1) * currentBuff.baseDmg
        if (currentBuff.duration <= 1) {
          this.playerStates[defender].buffs.splice(index)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
      } else if (currentBuff.type === 'arcane') {
        arcaneDamage = 1
        this.playerStates[defender].buffs[index].storedDmg += currentBuff.damage--
      }
    }

    let totalDamage = bleedDamage + poisonDamage + burnDamage + arcaneDamage
    this.defender.currentHP -= Math.round(totalDamage)

    return {
      type: 'buff',
      playerStates: this.playerStates.map(s => ({
        currentHP: s.currentHP,
        maxHP: s.maxHP,
        id: s.player.id
      })),
      playerDamaged: this.turn,
      bleedDamage: bleedDamage,
      poisonDamage: poisonDamage,
      burnDamage: burnDamage,
      arcaneDamage: arcaneDamage
    }
  }
}
