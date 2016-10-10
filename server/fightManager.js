import fightMessages from 'common/text/fight.js'
import Fight from 'server/fight.js'
import db from 'server/common/database.js'
import EventEmitter from 'events'

const fightDB = db.get('fights')

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

  get (id) {
    return this.fights.find(fightObj => fightObj.id === id)
  }

  async startFight (players) {
    const fight = new Fight(players)
    const fightObj = new EventEmitter()
    fightObj.doc = await fightDB.insert({
      players: players.map(p => ({
        _id: p.id,
        equipped: p.equipped.serialize()
      }))
    })
    fightObj.players = players
    fightObj.fight = fight
    fightObj.subscribers = []
    fightObj.attackHistory = []
    fightObj.id = fightObj.doc._id.toString()
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

    const attacker = resp.playerStates[resp.attacker]
    const defender = resp.playerStates[resp.defender]

    const weapon = fightObj.players[resp.attacker].weaponStats[resp.weapon].weapon

    fightMessages({add}, weapon, attacker, defender, resp.textData)

    messages.forEach(message => { message.chance /= chanceSum })

    const msg = getRandom(messages).message
    return msg
  }

  sendAttackResponse (fightObj, resp) {
    if (resp.type === 'regular') {
      resp.message = this.getRandomMessage(fightObj, resp)
    }

    fightObj.attackHistory.push(resp)
    fightObj.emit('attack', resp)
  }

  attack (fightObj) {
    const resp = fightObj.fight.attack()

    this.sendAttackResponse(fightObj, resp)

    if (resp.done) {
      fightObj.doc.history = fightObj.attackHistory
      fightDB.update({_id: fightObj.doc._id}, fightObj.doc).then(
        () => console.log('Fight ' + fightObj.id + ' stored successfully.')
      ).catch(err => console.error(err.stack || err))
      this.fights.splice(this.fights.indexOf(fightObj), 1)
    } else {
      setTimeout(() => this.attack(fightObj), 500)
    }
  }
}

export const fightManager = new FightManager()
