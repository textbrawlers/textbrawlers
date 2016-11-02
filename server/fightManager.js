import fightMessages from 'common/text/fight.js'
import Fight from 'server/fight.js'
import db from 'server/common/database.js'
import EventEmitter from 'events'
import {genNewNPCs} from './npcs.js'
import calculateNewElo from 'common/util/elo.js'

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
    const isNPC = fightObj.fight.playerStates.some(ps => ps.player.type === 'npc')
    console.log(isNPC)
    if (isNPC) {
      this.endNPCFight(fightObj)
    } else {
      this.endPVPFight(fightObj)
    }
  }

  endNPCFight (fightObj) {
    const playerStates = fightObj.fight.playerStates
    const npcIndex = playerStates.findIndex(ps => ps.player.type === 'npc')
    const npc = playerStates[npcIndex]
    const stats = playerStates[npcIndex + 1] ? playerStates[npcIndex + 1] : playerStates[0]
    let diffMod = 0
    if (npc.currentHP <= 0 && stats.maxHP !== 0) {
      diffMod += (stats.currentHP / stats.maxHP) * 0.1 * ((npc.difficulty + 1) / 5)
    } else if (npc.maxHP !== 0) {
      diffMod -= (npc.currentHP / npc.maxHP) * 0.1
    }
    let username
    userDB.findOne({ _id: stats.player.id }).then(acc => {
      if (acc.npcDifficulty) {
        const npcDiff = acc.npcDifficulty + diffMod
        acc.npcDifficulty = npcDiff < 0.1 ? 0.1 : npcDiff
        acc.npcs = genNewNPCs(acc.npcDifficulty)
      } else {
        acc.npcDifficulty = 0.1
      }
      username = acc.username
      return userDB.update({ _id: acc._id }, acc)
    }).then(() => console.log('Updated NPC data for ' + username + '.')
    ).catch(err => console.error(err.stack || err))
  }

  endPVPFight (fightObj) {
    const playerStates = fightObj.fight.playerStates
    const winnerIndex = playerStates.findIndex(ps => ps.currentHP > 0)
    const winner = playerStates[winnerIndex]
    const loser = playerStates[winnerIndex + 1] ? playerStates[winnerIndex + 1] : playerStates[0]
    this.getPVPRank(winner).then(winnerRank => {
      this.getPVPRank(loser).then(loserRank => {
        const newRank = calculateNewElo(winnerRank, loserRank)
        this.updatePVPRank(winner, newRank.winner)
        this.updatePVPRank(loser, newRank.loser)
      })
    }).catch(err => console.error(err.stack || err))
  }

  getPVPRank (playerState) {
    return userDB.findOne({ _id: playerState.player.id }).then(acc => {
      if (acc.pvpRank) {
        return acc.pvpRank
      } else {
        return 1500
      }
    }).catch(err => console.error(err.stack || err))
  }

  updatePVPRank (playerState, value) {
    let username = ''
    userDB.findOne({ _id: playerState.player.id }).then(acc => {
      acc.pvpRank = value
      username = acc.username
      return userDB.update({ _id: acc._id }, acc)
    }).then(() => console.log('Updated rank for ' + username + '.')
  ).catch(err => console.error(err.stack || err))
  }
}

export const fightManager = new FightManager()
