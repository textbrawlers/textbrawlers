
export default function messages(m, attacker, defender, round) {
    
    if (defender.hp <= 0) {
        m.add(100, '[attacker] finished off [defender].')
        m.add(100, '[attacker] abrutply ended [defender].')
        m.add(1, '[attacker] softly disemboweled [defender].')
        m.add(100, '[defender] had a bad day.')
        m.add(100, '[attacker] is victorious.')
        m.add(1, '[attacker], as the honorable man/woman, he/she is, has decided to spare [defender]\'s life... Lol jk!')
    } else {
            
        /*m.add(100, [
            'meddelande 1',
            'meddelande 2',
            'meddelande 3'
        ])
        
        m.add(5 [
            'meddelande 4',
            'meddelande 5',
            'meddelande 6'
        ])*/

        if (attacker.weapon.hasStat('ranged')) {
            if (round.missed) {
                m.add(100, '[attacker] fired at [defender] but missed.')
            } else if (round.blocked) {
                m.add(100, '[attacker] fired at [defender] but [defender] blocked.')
            } else if (round.critical) {
                m.add(100, '[attacker] fired at [defender] and hit a weak spot.]')
                m.add(1, '[attacker] 360 no-scoped [defender].]')
            } else {
                m.add(100, '[attacker] fired at [defender] and hit.')
            }
        }

        if (!attacker.weapon.hasStat('ranged')) {
            if (round.missed) {
                m.add(100, '[attacker] swinged his [item-name] at [defender] but missed.')
                m.add(50, '[attacker] flailed wildly at [defender] but missed. What a surprise.')
            } else if (round.blocked) {
                m.add(100, '[attacker] swinged his [item-name] at [defender] but [defender] blocked the attack.')
                m.add(50, '[attacker] flailed wildly at [defender] and got blocked, to no one\'s suprise.')
            } else if (round.critical) {
                m.add(100, '[attacker] swinged his [item-name] at [defender] and hit a weak spot.')
                m.add(50, '[attacker] flailed wildly at [defender] and hit a weak spot, to everyone\'s suprise.')
            } else {
                m.add(100, '[attacker] swinged his [item-name] at [defender] and hit.')
                m.add(50, '[attacker] flailed wildly at [defender] and hit, somehow.')
            }
        }
        
        if (attacker.weapon.type === 'bow') {
            if (round.blocked) {
                m.add(100, '[attacker] fired an arrow at [defender] but [defender] blocked it.')
            } else if (round.critical) {
                m.add(100, '[attacker] fired an arrow at [defender] which hit a critical spot.')
                m.add(1, '[defender] took an arrow to the knee.')
            } else {
                m.add(100, '[attacker] fired an arrow at [defender] which hit.')
            }

        }
        
    }
    
}