import db from 'server/common/database.js'
import NPC from 'common/game/npc.js'
import stats from 'common/json/stats.json'
import Stat from 'common/game/stat.js'
import Item from 'common/game/item.js'
import StatCollection from 'common/game/statCollection.js'
import EquippedInventory from 'common/game/equippedInventory.js'

const playerDB = db.get('users')

const nrOfNPCsPerLevel = 3
const npcs = []

export async function parseNPCs () {
  const npcConfig = await System.import('common/json/enemies.json')
  const enemies = await Promise.all(npcConfig.enemies.map(url => System.import(url)))

  enemies.forEach(enemy => {
    npcs.push(enemy)
  })
}

export function getAllCurrentNPCNamesForPlayer (acc, allowUpdate) {
  const allNpcNames = []
  for (let i = 0; i < acc.npcLevel; i++) {
    allNpcNames[i] = getCurrentNPCNamesForPlayer(acc, allowUpdate, i)
  }
  return allNpcNames
}

export function getCurrentNPCNamesForPlayer (acc, allowUpdate, level) {
  let updateDB = false
  let newNpcs = []
  let npcNames = []
  if (acc.npcs && acc.npcs.length > 0 && acc.npcs[level] && acc.npcs[level].length > 0) {
    acc.npcs[level].forEach(npc => {
      npcNames.push({name: npc.name, defeated: npc.defeated})
    })
  } else {
    let availableNPCs = []
    npcs.forEach(npc => {
      availableNPCs.push(npc)
    })
    for (let i = 0; i < nrOfNPCsPerLevel; i++) {
      const npcIndex = Math.floor(Math.random() * availableNPCs.length)
      let npc = availableNPCs[npcIndex] ? availableNPCs[npcIndex] : availableNPCs[0]
      npcNames.push({name: npc.name, defeated: false})
      newNpcs.push(npc)
      availableNPCs.splice(npcIndex, 1)
      updateDB = true
    }
    acc.npcs[level] = newNpcs
  }
  if (updateDB && allowUpdate) {
    update(acc)
  }
  return npcNames
}

export function getNPCFromName (acc, name, level) {
  const npcIndex = acc.npcs[level - 1].findIndex(dbNpc => dbNpc.name === name)
  return randomizeNPC(acc.npcs[level - 1][npcIndex], scaling(level))
}

function scaling (level) {
  return level * 0.036 + 0.1
}

function randomizeNPC (npc, level) {
  const weapons = {
    head: EquippedInventory.SLOT_HEAD,
    body: EquippedInventory.SLOT_BODY,
    legs: EquippedInventory.SLOT_LEGS,
    feet: EquippedInventory.SLOT_FEET,
    left: EquippedInventory.SLOT_LEFT_HAND,
    right: EquippedInventory.SLOT_RIGHT_HAND,
    trinket: EquippedInventory.SLOT_TRINKET
  }

  const equipped = new EquippedInventory({}, 7)

  const weaponStats = Object.entries(weapons).map(([key, slot]) => {
    const weaponConfig = npc.equipped[key]
    if (!weaponConfig) {
      return
    }

    const weapon = Item.fromJSON({
      id: weaponConfig.id,
      rarity: 'legendary',
      prefixes: []
    })

    equipped.set(slot, weapon)

    return {
      weapon: weapon,
      stats: buildStatCollection(weaponConfig.stats, level)
    }
  }).filter(weapon => weapon)

  return new NPC({
    name: npc.name,
    stats: buildStatCollection(npc.stats, level),
    weaponStats: weaponStats,
    equipped: equipped,
    type: 'npc'
  })
}

function buildStatCollection (stats, diffVal) {
  const statCollection = new StatCollection()
  Object.entries(stats).forEach(([key, value]) => {
    const val = randomizeValue(key, value, diffVal)
    const stat = new Stat(key, val)
    statCollection.add(stat)
  })
  return statCollection
}

function randomizeValue (key, valArr, diffVal) {
  let result = valArr[0] + Math.random() * (valArr[1] - valArr[0])
  if (stats[key].invertMult) {
    result /= getMultiplierValue()
    result /= diffVal
  } else {
    result *= getMultiplierValue()
    result *= diffVal
  }
  return shouldRound(key) ? Math.round(result) : result
}

function shouldRound (key) {
  if (stats[key].rounded) {
    return stats[key].rounded
  } else {
    return false
  }
}

function getMultiplierValue () {
  return Math.random() * 0.2 + 0.9
}

function update (acc) {
  playerDB.update({_id: acc._id}, acc).catch(err => console.error(err.stack || err))
}
