export default {
  apply (fightData) {
    const weapon = fightData.weapons[fightData.currentWeapon]
    let damage = fightData.damage
    let crits = 0

    if (Math.random() < weapon.stats.getValue('crit-chance')) {
      crits = 1
      if (Math.random() < weapon.stats.getValue('crit-chance') - 1) {
        crits = 2
        damage *= (1 + (1.5 * weapon.stats.getValue('crit-damage')))
        // this.log('ID: ' + fightData.attackId + '. Applying red crit, current damage = ' + damage + '.')
      } else {
        damage *= (1 + weapon.stats.getValue('crit-damage'))
        // this.log('ID: ' + fightData.attackId + '. Applying crit, current damage = ' + damage + '.')
      }
    } else {
      // this.log('ID: ' + fightData.attackId + '. No crit, current damage = ' + damage + '.')
    }
    return {
      crits: crits,
      damage: damage
    }
  }
}
