import Router from 'koa-router'
import { login, register, getPlayer } from './api/user.js'
import SPlayer from 'common/game/serverPlayer.js'
import { requestItem, requestInventory, moveItem, reassemble, add, getSocial } from './api/game.js'

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

router.use(['/user/get', '/game/requestItem', '/game/requestInventory', '/game/swapItems', '/game/reassemble', '/game/add', '/game/social'], auth)

router.post('/user/login', login)
router.post('/user/register', register)
router.get('/user/get', getPlayer)

router.post('/game/reassemble', reassemble)
router.post('/game/add', add)
router.post('/game/requestItem', requestItem)
router.post('/game/swapItems', moveItem)
router.get('/game/requestInventory', requestInventory)
router.get('/game/social', getSocial)

export default router
