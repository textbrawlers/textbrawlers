export default function messages (m, weapon, attacker, defender, round) {
  if (defender.currentHP <= 0) {
    m.add(100, '[attacker] finished off [defender].')
    m.add(100, '[attacker] abrutply ended [defender].')
    m.add(1, '[attacker] softly disemboweled [defender].')
    m.add(100, '[defender] had a bad day.')
    m.add(100, '[attacker] is victorious.')
    m.add(1, "[attacker], as the honorable man/woman, he/she is, has decided to spare [defender]'s life... Lol jk!")
    m.add(100, "[attacker] ended [defender]'s pitiful existance.")
  
    if (weapon.type === 'magical-weapon') {
      m.add(50, "[defender] was promptly turned into a bubbling pool of flesh.")
    }
  } else {
    /* m.add(100, [
        'meddelande 1',
        'meddelande 2',
        'meddelande 3'
    ])

    m.add(5 [
        'meddelande 4',
        'meddelande 5',
        'meddelande 6'
    ])*/

    if (weapon.hasStat('ranged')) {
      if (round.missed) {
        m.add(100, '[attacker] fired at [defender] but missed.')
        m.add(30, '[attacker] attempted to trickshot [defender], but failed miserably.')
      } else if (round.blocked) {
        m.add(100, '[attacker] fired at [defender] but [defender] blocked.')
        m.add(30, "[attacker] attempted to trickshot [defender], but failed to consider [defender]'s blocking skills.")
      } else if (round.crit) {
        m.add(100, '[attacker] fired at [defender] and hit a weak spot.]')
        m.add(30, '[attacker] managed to trickshot [defender], resulting in a critical hit!')
        m.add(1, '[attacker] 360 no-scoped [defender].]')
      } else {
        m.add(100, '[attacker] fired at [defender] and hit.')
        m.add(30, '[attacker] managed to trickshot [defender], though the result was hardly worth the effort.')
      }
    }

    if (!weapon.hasStat('ranged')) {
      if (round.missed) {
        m.add(100, '[attacker] swinged his [item-name] at [defender] but missed.')
        m.add(50, '[attacker] flailed wildly at [defender] but missed. What a surprise.')
      } else if (round.blocked) {
        m.add(100, '[attacker] swinged his [item-name] at [defender] but [defender] blocked the attack.')
        m.add(50, '[attacker] flailed wildly at [defender] and got blocked, to no one\'s suprise.')
      } else if (round.crit) {
        m.add(100, '[attacker] swinged his [item-name] at [defender] and hit a weak spot.')
        m.add(50, '[attacker] flailed wildly at [defender] and hit a weak spot, to everyone\'s suprise.')
      } else {
        m.add(100, '[attacker] swinged his [item-name] at [defender] and hit.')
        m.add(50, '[attacker] flailed wildly at [defender] and hit, somehow.')
      }
    }

    if (weapon.rarity === 'legendary' && weapon.hasStat('ranged')) {
      if (round.missed) {
        m.add(10, '[attacker] fired his legendary [item-name] at [defender] but missed.')
      } else if (round.blocked) {
        m.add(10, '[attacker] fired his legendary [item-name] at [defender] and got blocked.')
      } else if (round.crit) {
        m.add(10, '[attacker] fired his legendary [item-name] at [defender] and hit a weak spot.')
      } else {
        m.add(10, '[attacker] fired his legendary [item-name] at [defender] and hit.')
      }
    }
    
    if (weapon.rarity === 'legendary' && !weapon.hasStat('ranged')) {
      if (round.missed) {
        m.add(10, '[attacker] swinged his legendary [item-name] at [defender] but missed.')
      } else if (round.blocked) {
        m.add(10, '[attacker] swinged his legendary [item-name] at [defender] but [defender] blocked the attack.')
      } else if (round.crit) {
        m.add(10, '[attacker] swinged his legendary [item-name] at [defender] and hit a weak spot.')
      } else {
        m.add(10, '[attacker] swinged his legendary [item-name] at [defender] and hit.')
      }
    }

    if (weapon.type === 'bow') {
      if (round.blocked) {
        m.add(100, '[attacker] fired an arrow at [defender] but [defender] blocked it.')
      } else if (round.crit) {
        m.add(100, '[attacker] fired an arrow at [defender] which hit a critical spot.')
        m.add(1, '[defender] took an arrow to the knee.')
      } else {
        m.add(100, '[attacker] fired an arrow at [defender] which hit.')
      }
    }

    if (weapon.type === 'sword') {
      if (round.blocked) {
        m.add(100, '[attacker] sliced at [defender]\'s defences.')
      } else if (round.crit) {
        m.add(100, '[attacker] sliced [defender] and hit a critical spot.')
      } else {
        m.add(100, '[attacker] sliced [defender].')
      }
    }

    if (weapon.type === 'axe') {
      if (round.blocked) {
        m.add(100, '[attacker] chopped at [defender]\'s defences.')
      } else if (round.crit) {
        m.add(100, '[attacker] chopped [defender] and hit a critical spot.')
      } else {
        m.add(100, '[attacker] chopped [defender].')
      }
    }

    if (weapon.type === 'hammer') {
      if (round.blocked) {
        m.add(100, '[attacker] battered [defender]\'s defences.')
      } else if (round.crit) {
        m.add(100, '[attacker] battered [defender] and hit a critical spot.')
      } else {
        m.add(100, '[attacker] battered [defender].')
      }
    }

    if (weapon.type === 'knife') {
      if (round.blocked) {
        m.add(100, '[attacker] stabbed at [defender]\'s defences.')
      } else if (round.crit) {
        m.add(100, '[attacker] stabbed [defender] and hit a critical spot.')
        m.add(20, '[attacker] stabbed [defender] in the back. What a coward.')
      } else {
        m.add(100, '[attacker] stabbed [defender].')
      }
    }

    if (weapon.type === 'magical-weapon') {
      if (round.blocked) {
        m.add(100, '[attacker] fired a spell at [defender]\'s defences.')
      } else if (round.crit) {
        m.add(100, '[attacker] fired a spell at [defender] and hit a critical spot.')
      } else {
        m.add(100, '[attacker] fired a spell at [defender].')
      }
    }
  }
}
