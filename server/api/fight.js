const enemies = {
  playerA: require('../enemies/playerA.json'),
  playerB: require('../enemies/playerB.json'),
  tankfan: require('../enemies/tankfan.json')
}

module.exports.fight = function * () {
  let a = Object.assign({}, enemies[this.params.a])
  let b = Object.assign({}, enemies[this.params.b])

  a.hp = a.maxhp
  b.hp = b.maxhp

  const fight = []

  if (Math.random() > 0.5) {
    const temp = a
    a = b
    b = temp
  }

  fight.push({
    type: 'coinflip',
    starting: Object.assign({}, a)
  })

  fight.push({
    type: 'status',
    a: Object.assign({}, a),
    b: Object.assign({}, b)
  })

  a.bleeds = []
  b.bleeds = []

  function attack (attacker, defender) {
    let hits = Math.floor(attacker.damage.hit)

    const hitChance = attacker.damage.hit - hits

    if (Math.random() < hitChance) {
      hits++
    }

    defender.bleeds.forEach(bleed => {
      if (bleed.duration > 0) {
        bleed.duration--
        let dmgInflicted = bleed.damage

        defender.hp -= dmgInflicted

        fight.push({
          type: 'bleedtick',
          damage: dmgInflicted,
          defender: Object.assign({}, defender),
          attacker: Object.assign({}, attacker)
        })
      }
    })

    for (let i = 0; i < hits; i++) {
      doAttack(attacker, defender)
    }

    if (hits === 0) {
      fight.push({
        type: 'attack',
        attacker: Object.assign({}, attacker),
        defender: Object.assign({}, defender),
        damageInflicted: 0,
        modifiers: [ 'miss' ]
      })
    }
  }

  function doAttack (attacker, defender, modifier) {
    let dmgInflicted = attacker.damage.normal
    let modifiers = []

    if (Math.random() < defender.damage.blockchance) {
      dmgInflicted *= defender.damage.blockmodifier
      modifiers.push('block')
    }

    if (Math.random() < attacker.damage.critchance) {
      dmgInflicted *= attacker.damage.crit
      modifiers.push('crit')
    }

    dmgInflicted = Math.ceil(dmgInflicted)

    defender.hp -= dmgInflicted

    fight.push({
      type: 'attack',
      attacker: Object.assign({}, attacker),
      defender: Object.assign({}, defender),
      damageInflicted: dmgInflicted,
    modifiers})

    if (Math.random() < attacker.damage.bleedchance) {
      defender.bleeds.push({
        duration: attacker.damage.bleedduration,
        damage: attacker.damage.bleeddamage
      })

      fight.push({
        type: 'dotcreate',
        duration: attacker.damage.bleedduration,
        damage: attacker.damage.bleeddamage,
        attacker,
      defender})
    }
  }

  let who = true
  let round = 0

  while (a.hp > 0 && b.hp > 0) {
    who = !who

    if (who) {
      attack(b, a)
    } else {
      round++
      fight.push({
        type: 'round',
      round})
      attack(a, b)
    }
  }

  if (a.hp > b.hp) {
    fight.push({
      type: 'fightDone',
      winner: Object.assign({}, a),
      loser: Object.assign({}, b)
    })
  } else {
    fight.push({
      type: 'fightDone',
      winner: Object.assign({}, b),
      loser: Object.assign({}, a)
    })
  }

  this.body = JSON.stringify({
    between: [a.name, b.name],
    fight: fight
  }, undefined, '\t')
}
