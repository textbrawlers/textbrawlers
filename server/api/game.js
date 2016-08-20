import Monk from 'monk'
import { generateItem } from 'common/game/itemGenerator.js'
import * as Realtime from 'server/realtime.js'

const db = new Monk(process.env.MONGODB || 'localhost/retardarenan')
const users = db.get('users')

export async function requestItem (ctx) {
  ctx.player.inventory.push(await generateItem())

  await ctx.player.save()

  ctx.body = ctx.player.serialize()
}

export async function requestInventory (ctx) {
  ctx.body = ctx.player.serialize()
}

export async function moveItem (ctx) {
  let fromInv = getCorrectInventory(ctx, ctx.request.body.from.inventory)
  let toInv = getCorrectInventory(ctx, ctx.request.body.to.inventory)
  let fromPos = ctx.request.body.from.item
  let toPos = ctx.request.body.to.item

  let tempItem = fromInv.get(fromPos)
  fromInv.set(fromPos, toInv.get(toPos))
  toInv.set(toPos, tempItem)

  ctx.body = ctx.player.serialize()

  await ctx.player.save()
}

export async function reassemble (ctx) {
  const player = ctx.player

  if (player.reassemble.get(0) && player.reassemble.get(1) && player.reassemble.get(2) && player.reassemble.get(3)) {
    player.reassemble.set(0, undefined)
    player.reassemble.set(1, undefined)
    player.reassemble.set(2, undefined)
    player.reassemble.set(3, undefined)
    ctx.player.inventory.push(await generateItem())
  }

  ctx.body = ctx.player.serialize()
  await ctx.player.save()
}

export async function add (ctx) {
  const targetName = ctx.request.body.name || ''

  const invitedPlayer = await users.findOne({username: targetName})

  if (!invitedPlayer) {
    ctx.body = { success: false, message: 'Player not found' }
    return
  }

  if (invitedPlayer._id.equals(ctx.account._id)) {
    ctx.body = { success: false, message: 'You cannot add yourself' }
    return
  }

  invitedPlayer.social = invitedPlayer.social || {}
  invitedPlayer.social.requests = invitedPlayer.social.requests || []
  invitedPlayer.social.friends = invitedPlayer.social.friends || []

  ctx.account.social = ctx.account.social || {}
  ctx.account.social.requests = ctx.account.social.requests || []
  ctx.account.social.friends = ctx.account.social.friends || []

  const exisitingRequest = invitedPlayer.social.requests.find(req => req.from._id.equals(ctx.account._id))

  if (ctx.account.social.friends.find(friend => friend._id.equals(invitedPlayer._id))) {
    ctx.body = { success: false, message: 'You are already friends' }
    return
  }

  if (!exisitingRequest) {
    invitedPlayer.social.requests.push({
      from: {
        username: ctx.account.username,
        _id: ctx.account._id
      }
    })
  }

  const requestOtherWay = ctx.account.social.requests.find(req => req.from._id.equals(invitedPlayer._id))

  if (requestOtherWay) {
    ctx.account.social.requests = ctx.account.social.requests.filter(req => !req.from._id.equals(invitedPlayer._id))
    invitedPlayer.social.requests = invitedPlayer.social.requests.filter(req => !req.from._id.equals(ctx.account._id))
    console.log('Friend added')

    invitedPlayer.social.friends.push({
      username: ctx.account.username,
      _id: ctx.account._id
    })

    ctx.account.social.friends.push({
      username: invitedPlayer.username,
      _id: invitedPlayer._id
    })
  }

  await users.update({_id: invitedPlayer._id}, { $set: {social: invitedPlayer.social} })
  await users.update({_id: ctx.account._id}, { $set: {social: ctx.account.social} })

  Realtime.sendMessage(invitedPlayer._id, 'social', true)
  Realtime.sendMessage(ctx.account._id, 'social', true)

  ctx.body = { success: true }
}

export async function removeRequest (ctx) {
  ctx.account.social = ctx.account.social || {}
  ctx.account.social.requests = ctx.account.social.requests || {}

  ctx.account.social.requests = ctx.account.social.requests.filter(req => !req.from._id.equals(ctx.request.body.id))

  await users.update({_id: ctx.account._id}, { $set: {social: ctx.account.social} })
  Realtime.sendMessage(ctx.account._id, 'social', true)
  ctx.body = { success: true }
}

export async function removeFriend (ctx) {
  ctx.account.social = ctx.account.social || {}
  ctx.account.social.friends = ctx.account.social.friends || {}

  const friend = await users.findOne({ _id: ctx.request.body.id })

  if (!friend) {
    ctx.body = { success: false, message: 'Friend not found' }
    return
  }

  friend.social = friend.social || {}
  friend.social.friends = friend.social.friends || {}

  friend.social.friends = friend.social.friends.filter(friend => !friend._id.equals(ctx.account._id))
  ctx.account.social.friends = ctx.account.social.friends.filter(account => !account._id.equals(friend._id))

  await users.update({_id: friend._id}, { $set: {social: friend.social} })
  await users.update({_id: ctx.account._id}, { $set: {social: ctx.account.social} })

  Realtime.sendMessage(friend._id, 'social', true)
  Realtime.sendMessage(ctx.account._id, 'social', true)

  ctx.body = { success: true }
}

export async function inviteGame (ctx) {
  const playerToInvite = ctx.request.body.id

  Realtime.invitePlayer(playerToInvite, ctx.account)

  ctx.body = { success: true }
}

export async function acceptInvite (ctx) {
  const playerId = ctx.account._id
  const inviteId = ctx.request.body.id

  Realtime.acceptInvite(playerId, inviteId)

  ctx.body = { success: true }
}

export async function getSocial (ctx) {
  ctx.body = ctx.account.social
}

function getCorrectInventory (ctx, inventory) {
  switch (inventory) {
    case 'equipped':
      return ctx.player.equipped
    case 'inventory':
      return ctx.player.inventory
    case 'reassemble':
      return ctx.player.reassemble
    default:
      return
  }
}
