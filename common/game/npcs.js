import Entity from './entity.js'

const npcs = []

export async function parseNPCs () {
  const npcConfig = await System.import('common/json/enemies.json')
  const enemies = await Promise.all(npcConfig.enemies.map(url => System.import(url)))

  enemies.forEach(enemy => {
    npcs.push(enemy)
  })
}

export function randomizeNPC (diffVal) {
  const npc = npcs[Math.random() * npcs.length]

  const newNPC = {
    name: npc.name,
    'max-health': Math.round(randomizeValue(npc.hp, diffVal)),
    equipped: {
      left: {
        id: npc.equipped.left.id,
        stats: {
          damage: Math.round(randomizeValue(npc.equipped.left.id.stats.damage, diffVal)),
          'attack-speed': randomizeValue(npc.equipped.left.id.stats['attack-speed'], diffVal),
          'crit-chance': randomizeValue(npc.equipped.left.id.stats['crit-chance'], diffVal),
          'crit-damage': randomizeValue(npc.equipped.left.id.stats['crit-damage'], diffVal)
        }
      }
    }
  }

  newNPC.type = 'npc'

  return Entity.fromJSON(newNPC)
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
