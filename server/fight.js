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

  luckWeightLifter(players) {
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
      attacker: this.attackerNum,
      defender: this.defenderNum,
      hasWeapon: this.hasWeapon,
      miss: this.miss,
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
        this.damage = this.weapons[this.currentWeapon].stats.getValue('damage')
        this.damage *= (1 + this.weapons[this.currentWeapon].stats.getValue('damage-multiplier'))

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
    if (Math.random() < this.defender.player.getStat('block-chance').value){
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
      } else {
        this.damage *= (1 + weapon.stats.getValue('crit-damage'))
      }
    }
  }

  applyBleed () {
    const defender = this.getCurrentDefenderIndex()
    const weapon = this.weapons[this.currentWeapon]

    if (Math.random() <= weapon.stats.getValue('bleed-chance')) {
      let bleedStack = {type: 'bleed', duration: weapon.stats.getValue('bleed-duration')}
      this.playerStates[defender].buffs.push(bleedStack)
    }
  }

  applyPoison () {
    const defender = this.getCurrentDefenderIndex()
    const oldBuffs = this.playerStates[defender].buffs
    const weapon = this.weapons[this.currentWeapon]

    if (oldBuffs.find(buff => buff.type === 'poison')) {
      const buffIndex = oldBuffs.findIndex(buff => buff.type === 'poison')

      if (oldBuffs[buffIndex].damage < weapon.stats.getValue('poison-damage')) {
        const newBuff = {
          type: 'poison',
          duration: weapon.stats.getValue('poison-duration'),
          damage: weapon.stats.getValue('poison-damage')
        }
        this.playerStates[defender].buffs[buffIndex] = newBuff
      }
    } else {
      const newBuff = {
        type: 'poison',
        duration: weapon.stats.getValue('poison-duration'),
        damage: weapon.stats.getValue('poison-damage')
      }
      this.playerStates[defender].buffs.push(newBuff)
    }
  }

  applyStun () {
    const defender = this.getCurrentDefenderIndex()
    if (Math.random() < this.weapons[this.currentWeapon].stats.getValue('stun-chance')) {
      this.playerStates[defender].buffs.push({type: 'stun'})
    }
  }

  applyBurn (baseDamage) {
    const defender = this.getCurrentDefenderIndex()
    const weapon = this.weapons[this.currentWeapon]

    if (Math.random() < weapon.stats.getValue('burn-chance')) {
      const oldBuffs = this.playerStates[defender].buffs

      if (oldBuffs.find(buff => buff.type === 'burn')) {
        const buffIndex = oldBuffs.findIndex(buff => buff.type === 'burn')

        if (oldBuffs[buffIndex].damage < weapon.stats.getValue('burn-damage')) {
          const newBuff = {type: 'burn',
            duration: 3,
            baseDmg: baseDamage,
            damageMult: weapon.stats.getValue('burn-damage')
          }
          this.playerStates[defender].buffs[buffIndex] = newBuff
        }
      } else {
        const newBuff = {type: 'burn',
          duration: 3,
          baseDmg: baseDamage,
          damageMult: weapon.stats.getValue('burn-damage')
        }
        this.playerStates[defender].buffs.push(newBuff)
      }
    }
  }

  applyArcane () {
    const defender = this.getCurrentDefenderIndex()
    const chance = this.weapons[this.currentWeapon].stats.getValue('arcane-chance')

    if (Math.random() < chance) {
      const oldBuffs = this.playerStates[defender].buffs
      const weapon = this.weapons[this.currentWeapon]

      if (oldBuffs.find(buff => buff.type === 'arcane')) {
        const buffIndex = oldBuffs.findIndex(buff => buff.type === 'arcane')
        let damage = oldBuffs[buffIndex].damage

        if (damage < weapon.stats.getValue('arcane-damage')) {
          let currentStacks =oldBuffs[buffIndex].stacks

          if (currentStacks >= 4) {
            this.damage += oldBuffs[buffIndex].storedDmg
            this.arcaneDamage = oldBuffs[buffIndex].storedDmg
            this.playerStates[defender].buffs.splice(buffIndex, 1)
          } else {
            const newBuff = {type: 'arcane',
              stacks: currentStacks++,
              damage: weapon.stats.getValue('arcane-damage'),
              storedDmg: oldBuffs[buffIndex].storedDmg
            }
            this.playerStates[defender].buffs[buffIndex] = newBuff
          }
        } else {
          this.playerStates[defender].buffs[buffIndex].stacks++
        }
      } else {
        const newBuff = {type: 'arcane',
          stacks: 1,
          damage: weapon.stats.getValue('arcane-damage'),
          storedDmg: 0
        }
        this.playerStates[defender].buffs.push(newBuff)
      }
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

    let defender = this.getCurrentAttackerIndex()
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
        burnDamage = Math.round(currentBuff.damageMult * currentBuff.baseDmg)
        if (currentBuff.duration <= 1) {
          this.playerStates[defender].buffs.splice(index)
        } else {
          this.playerStates[defender].buffs[index].duration--
          index++
        }
      } else if (currentBuff.type === 'arcane') {
        arcaneDamage = 1
        this.playerStates[defender].buffs[index].storedDmg += currentBuff.damage--
        index++
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
