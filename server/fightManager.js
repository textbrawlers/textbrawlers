import Fight from 'server/fight.js'
import EventEmitter from 'events'

export default class FightManager {

  constructor () {
    this.fights = []
  }

  startFight (players) {
    const fight = new Fight(players)
    const fightObj = new EventEmitter()
    fightObj.players = players
    fightObj.fight = fight
    this.fights.push(fightObj)

    this.attack(fightObj)

    return fightObj
  }

  attack (fightObj) {
    const resp = fightObj.fight.attack()

    fightObj.emit('attack', resp)

    if (resp.done) {
      this.fights.splice(this.fights.indexOf(fightObj), 1)
    } else {
      setTimeout(() => this.attack(fightObj), 500)
    }
  }
}
