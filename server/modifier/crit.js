export default {
  apply (fightData) {
    const weapon = fightData.weapons[fightData.currentWeapon]

    if (Math.random() < weapon.stats.getValue('crit-chance')) {
      fightData.crits = 1
      if (Math.random() < weapon.stats.getValue('crit-chance') - 1) {
<<<<<<< HEAD
        fightData.crits = 2
        fightData.damage *= (1 + (1.5 * weapon.stats.getValue('crit-damage')))
      } else {
        fightData.damage *= (1 + weapon.stats.getValue('crit-damage'))
=======
        crits = 2
        damage *= (1 + (1.5 * weapon.stats.getValue('crit-damage')))
        // this.log('ID: ' + fightData.attackId + '. Applying red crit, current damage = ' + damage + '.')
      } else {
        damage *= (1 + weapon.stats.getValue('crit-damage'))
        // this.log('ID: ' + fightData.attackId + '. Applying crit, current damage = ' + damage + '.')
>>>>>>> a3beb3a16769452a5ee6a62464999d92a5d63435
      }
    } else {
      // this.log('ID: ' + fightData.attackId + '. No crit, current damage = ' + damage + '.')
    }
    return fightData
  }
}
