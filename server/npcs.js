import db from 'server/common/database.js'
import NPC from 'common/game/npc.js'
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
  let npcsForPlayer = []
  if (acc.player.npcs && acc.player.npcs.length > 0) {
    npcsForPlayer = acc.player.npcs
  } else {
    for (let i = 0; i < 5; i++) {
      npcsForPlayer[i] = randomizeNPC(1) // Magical number is to be removed.
    }
    acc.player.npcs = npcsForPlayer.map(npc => npc.serialize())
    playerDB.update({_id: acc._id}, acc).then(
      () => console.log('Player "' + acc.username + '"s npcs updated.')
    ).catch(err => console.error(err.stack || err))
  }
  return npcsForPlayer
}

function randomizeNPC (diffVal) {
  const npcIndex = Math.floor(Math.random() * npcs.length)
  const npc = npcs[npcIndex] ? npcs[npcIndex] : npcs[0]

  return new NPC({
    name: npc.name,
    stats: new StatCollection([
      new Stat('max-health', Math.round(randomizeValue(npc.stats.hp, diffVal)))
    ]),
    weaponStats: [{
      weapon: Item.fromJSON({id: npc.equipped.left.id, rarity: 'legendary', prefixes: []}),
      stats: new StatCollection([
        new Stat('damage', Math.round(randomizeValue(npc.equipped.left.stats.damage, diffVal))),
        new Stat('attack-speed', randomizeValue(npc.equipped.left.stats['attack-speed'], diffVal)),
        new Stat('crit-chance', randomizeValue(npc.equipped.left.stats['crit-chance'], diffVal)),
        new Stat('crit-damage', randomizeValue(npc.equipped.left.stats['crit-damage'], diffVal))
      ])
    }],
    type: 'npc'
  })
}

function randomizeValue (valArr, diffVal) {
  let result = valArr[0] + Math.random() * (valArr[1] - valArr[0])
  result *= getMultiplierValue()
  result *= diffVal
  return result
}

function getMultiplierValue () {
  return Math.random() * 0.4 + 0.8
}
