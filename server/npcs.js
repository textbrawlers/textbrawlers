import db from 'server/common/database.js'
import NPC from 'common/game/npc.js'
import stats from 'common/json/stats.json'
import Stat from 'common/game/stat.js'
import Item from 'common/game/item.js'
import StatCollection from 'common/game/statCollection.js'

const playerDB = db.get('users')

const npcs = []

export async function parseNPCs () {
  const npcConfig = await System.import('common/json/enemies.json')
  const enemies = await Promise.all(npcConfig.enemies.map(url => System.import(url)))

  enemies.forEach(enemy => {
    npcs.push(enemy)
  })
}

export function getCurrentNPCsForPlayer (acc) {
  let updateDB = false
  let diffVal = 0.1
  if (acc.player.npcDifficulty) {
    diffVal = acc.player.npcDifficulty
  } else {
    acc.player.npcDifficulty = diffVal
    updateDB = true
  }
  let npcsForPlayer = []
  if (acc.player.npcs && acc.player.npcs.length > 0) {
    npcsForPlayer = acc.player.npcs
  } else {
    for (let i = 0; i < 5; i++) {
      npcsForPlayer[i] = randomizeNPC(diffVal, i).serialize()
    }
    acc.player.npcs = npcsForPlayer
    updateDB = true
  }
  if (updateDB) {
    playerDB.update({_id: acc._id}, acc).then(
      () => console.log('Player "' + acc.username + '"s npcs updated.')
    ).catch(err => console.error(err.stack || err))
  }
  return npcsForPlayer
}

function randomizeNPC (diffVal, selectDiff) {
  const npcIndex = Math.floor(Math.random() * npcs.length)
  const npc = npcs[npcIndex] ? npcs[npcIndex] : npcs[0]
  const difficulty = diffVal * (selectDiff + 1)

  return new NPC({
    name: npc.name,
    difficulty: selectDiff,
    stats: buildStatCollection(npc.stats, difficulty),
    weaponStats: [{
      weapon: Item.fromJSON({id: npc.equipped.left.id, rarity: 'legendary', prefixes: []}),
      stats: buildStatCollection(npc.equipped.left.stats, diffVal)
    }],
    type: 'npc'
  })
}

function buildStatCollection (stats, diffVal) {
  const statCollection = new StatCollection()
  Object.entries(stats).forEach(([key, value]) => {
    statCollection.add(new Stat(key, randomizeValue(key, value, diffVal)))
  })
  return statCollection
}

function randomizeValue (key, valArr, diffVal) {
  let result = valArr[0] + Math.random() * (valArr[1] - valArr[0])
  result *= getMultiplierValue()
  result *= diffVal
  return shouldRound(key) ? Math.round(result) : result
}

function shouldRound (key) {
  return stats[key].rounded
}

function getMultiplierValue () {
  return Math.random() * 0.4 + 0.8
}
