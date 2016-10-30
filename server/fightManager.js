import fightMessages from 'common/text/fight.js'
import Fight from 'server/fight.js'
import db from 'server/common/database.js'
import EventEmitter from 'events'
import * as NPCs from './npcs.js'

const fightDB = db.get('fights')
const userDB = db.get('users')

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
    const playersJSON = players.map(p => {
      if (p.type === 'npc') {
        return { equipped: p.equipped.serialize(), name: p.name }
      } else {
        return {
          _id: p.id,
          equipped: p.equipped.serialize()
        }
      }
    })
    fightObj.doc = await fightDB.insert({
      players: playersJSON
    })
    fightObj.players = players
    fightObj.fight = fight
    fightObj.subscribers = []
    fightObj.attackHistory = []
    fightObj.id = fightObj.doc._id.toString()
    this.fights.push(fightObj)

    this.attack(fightObj)

    console.log('New fight created: ' + fightObj.id)

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

    if (!fightObj.players[resp.attacker]) {
      throw new Error(`Fight does not have player ${resp.attacker}`)
    }

    const weapon = resp.textData.hasWeapon ? fightObj.players[resp.attacker].weaponStats[resp.weapon].weapon : undefined

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
      this.onFightEnd(fightObj)
      fightObj.doc.history = fightObj.attackHistory
      fightDB.update({_id: fightObj.doc._id}, fightObj.doc).then(
        () => console.log('Fight ' + fightObj.id + ' stored successfully.')
      ).catch(err => console.error(err.stack || err))
      this.fights.splice(this.fights.indexOf(fightObj), 1)
    } else {
      setTimeout(() => this.attack(fightObj), 500)
    }
  }

  onFightEnd (fightObj) {
    console.log('Kör onFightEnd')
    const isNPC = fightObj.fight.playerStates.some(ps => ps.player.type === 'npc')
    console.log(isNPC)
    if (isNPC) {
      this.endNPCFight(fightObj)
    } else {
      this.endPVPFight(fightObj)
    }
  }

  endNPCFight (fightObj) {
    console.log('Kör endNPCFight')
    const playerStates = fightObj.fight.playerStates
    const npcIndex = playerStates.findIndex(ps => ps.player.type === 'npc')
    console.log(npcIndex)
    const npc = playerStates[npcIndex]
    const player = playerStates[npcIndex + 1] ? playerStates[npcIndex + 1] : playerStates[0]
    let diffMod = 1
    if (npc.currentHP <= 0) {
      diffMod += player.currentHP / player.maxHP
    } else {
      diffMod -= npc.currentHP / npc.maxHP
    }
    console.log('DB stuff')
    userDB.findOne({ _id: player.id }).then(acc => {
      acc.player.npcDifficulty += diffMod * 0.1
      return userDB.update({ _id: player.id }, acc)
    }).catch(err => console.error(err.stack || err))
    console.log('DB done')
  }

  endPVPFight (fightObj) {

  }
}

export const fightManager = new FightManager()
