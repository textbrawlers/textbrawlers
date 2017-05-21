import fightMessages from 'common/text/fight.js'
import Fight from 'server/fight.js'
import db from 'server/common/database.js'
import EventEmitter from 'events'
import {getCurrentNPCNamesForPlayer} from './npcs.js'
import calculateNewElo from 'common/util/elo.js'

const fightDB = db.get('fights')
const userDB = db.get('users')

function getRandom (droptable) {
  if (droptable.length <= 0 || !droptable) {
    console.log('FightManager, func getRandom() got empty table')
  }

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
    fightObj.fightDonePromise = new Promise(resolve => {
      fightObj.resolveFightDone = resolve
    })

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

  saveFight (fightObj) {
    this.onFightEnd(fightObj)
    fightObj.doc.history = fightObj.attackHistory
    fightDB.update({_id: fightObj.doc._id}, fightObj.doc).then(
      () => console.log('Fight ' + fightObj.id + ' stored successfully.')
    ).catch(err => console.error(err.stack || err))
    this.fights.splice(this.fights.indexOf(fightObj), 1)
  }

  finishAttack (fightObj, resp) {
    this.sendAttackResponse(fightObj, resp)

    if (resp.done) {
      this.saveFight(fightObj)
    } else {
      this.attack(fightObj)
    }
  }

  attack (fightObj) {
    const resp = fightObj.fight.attack()

    if (resp.type === 'newTurn') {
      setTimeout(() => {
        this.finishAttack(fightObj, resp)
      }, process.env.QUICK_FIGHTS === true ? 0 : 1500)
    } else {
      this.finishAttack(fightObj, resp)
    }
  }

  onFightEnd (fightObj) {
    const isNPC = fightObj.fight.playerStates.some(ps => ps.player.type === 'npc')
    if (isNPC) {
      this.endNPCFight(fightObj)
    } else {
      this.endPVPFight(fightObj)
    }
    fightObj.resolveFightDone
  }

  endNPCFight (fightObj) {
    const playerStates = fightObj.fight.playerStates
    const npcIndex = playerStates.findIndex(ps => ps.player.type === 'npc')
    const npc = playerStates[npcIndex]
    const stats = playerStates[npcIndex + 1] ? playerStates[npcIndex + 1] : playerStates[0]
    const currentLevel = fightObj.level - 1

    let username
    if (npc.currentHP <= 0) {
      userDB.findOne({ _id: stats.player.id }).then(acc => {
        if (fightObj.level <= acc.npcLevel) {
          const dbNpcIndex = acc.npcs[currentLevel].findIndex(dbNpc => dbNpc.name === npc.player.name)
          acc.npcs[currentLevel][dbNpcIndex].defeated = true
          let levelComplete = true
          acc.npcs[currentLevel].forEach(dbNpc => {
            levelComplete = dbNpc.defeated ? levelComplete : false
          })
          if (levelComplete && !isNaN(acc.npcLevel) && acc.npcLevel) {
            if (parseInt(fightObj.level) === parseInt(acc.npcLevel)) {
              acc.npcLevel = acc.npcLevel + 1
            } else {
              acc.npcLevel = acc.npcLevel
            }
            acc.npcs[currentLevel] = []
            getCurrentNPCNamesForPlayer(acc, false, currentLevel)
          } else if (!isNaN(acc.npcLevel) && acc.npcLevel) {
            acc.npcLevel = acc.npcLevel
          } else {
            acc.npcLevel = 1
          }
        }
        username = acc.username
        console.log('Player id: ' + acc._id)
        return userDB.update({ _id: acc._id }, acc)
      }).then(() => console.log('Updated NPC data for ' + username + '.')
      ).catch(err => console.error(err.stack || err))
    }
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
