import Router from 'koa-router'
import { login, register, getPlayer } from './api/user.js'
import SPlayer from 'common/game/serverPlayer.js'
import { requestItem, requestInventory } from './api/game.js'

const auth = async (ctx, next) => {
  const key = ctx.request.header.key

  const player = await SPlayer.fromKey(key)

  if (player) {
    ctx.player = player
    await next()
  } else {
    ctx.throw(401)
  }
}


const router = new Router()

router.use(['/user/get', '/game/requestItem', '/game/requestInventory'], auth)

router.post('/user/login', login)
router.post('/user/register', register)
router.get('/user/get', getPlayer)

router.post('/game/requestItem', requestItem)
router.get('/game/requestInventory', requestInventory)

export default router
