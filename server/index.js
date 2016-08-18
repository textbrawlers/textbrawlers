import Router from 'koa-router'
import { login, register, getPlayer } from './api/user.js'
import SPlayer from 'common/game/serverPlayer.js'
import * as game from './api/game.js'

const auth = async (ctx, next) => {
  const key = ctx.request.header.key

  const { player, jsonUser } = await SPlayer.fromKey(key, true)

  if (player) {
    ctx.player = player
    ctx.account = jsonUser
    await next()
  } else {
    ctx.throw(401)
  }
}

const router = new Router()

router.post('/user/login', login)
router.post('/user/register', register)
router.get('/user/get', auth, getPlayer)

router.post('/game/reassemble', auth, game.reassemble)
router.post('/game/add', auth, game.add)
router.post('/game/requestItem', auth, game.requestItem)
router.post('/game/swapItems', auth, game.moveItem)
router.post('/game/removefriend', auth, game.removeFriend)
router.post('/game/removerequest', auth, game.removeRequest)
router.post('/game/inviteGame', auth, game.inviteGame)
router.get('/game/requestInventory', auth, game.requestInventory)
router.get('/game/social', auth, game.getSocial)

export default router
