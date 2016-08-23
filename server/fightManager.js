import fightMessages from 'common/fight/text.js'
import Fight from 'server/fight.js'
import EventEmitter from 'events'

function getRandom (droptable) {
  let rn = Math.random()

  for (const item of droptable) {
    if (rn < item.chance) {
      return item
    }
    rn -= item.chance
  }
}

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

  getRandomMessage (fightObj, resp) {
    const messages = []
    let chanceSum = 0

    const add = (chance, message) => {
      messages.push({ chance, message })
      chanceSum += chance
    }

    messages.forEach(message => { message.chance /= chanceSum })

    const attacker = fightObj.players[resp.attacker]
    const defender = fightObj.players[resp.defender]

    const weapon = fightObj.players[resp.attacker].weaponStats[resp.weapon].weapon

    fightMessages({add}, weapon, attacker, defender, resp)

    return getRandom(messages).message
  }

  sendAttackResponse (fightObj, resp) {
    if (resp.type === 'regular') {
      resp.message = this.getRandomMessage(fightObj, resp)
    }

    fightObj.emit('attack', resp)
  }

  attack (fightObj) {
    const resp = fightObj.fight.attack()

    this.sendAttackResponse(fightObj, resp)

    if (resp.done) {
      this.fights.splice(this.fights.indexOf(fightObj), 1)
    } else {
      setTimeout(() => this.attack(fightObj), 500)
    }
  }
}

export const fightManager = new FightManager()
