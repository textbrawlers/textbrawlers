import Fight from 'server/fight.js'

export default class FightManager {

  constructor () {
    this.fights = []
  }

  startFight (rp1, rp2) {
    const p1 = rp1.player
    const p2 = rp2.player

    const fight = new Fight([p1, p2])
    const fightObj = { p1, p2, fight }
    this.fights.push(fightObj)

    this.attack(fightObj)
  }

  attack (fightObj) {
    const resp = fightObj.fight.attack()

    console.log(resp)

    setTimeout(() => this.attack(fightObj), 500)
  }

}
