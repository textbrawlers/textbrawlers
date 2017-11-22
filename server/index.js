import Router from 'koa-router'
import { login, register, getPlayer, checkKey } from './api/user.js'
import SPlayer from 'common/game/serverPlayer.js'
import * as game from './api/game.js'
import * as gamedata from './api/gamedata.js'

const jsonApi = async (ctx, next) => {
  await next()

  if (ctx.query.format === 'pretty') {
    ctx.body = `
    <style>
      body { margin: 0; }
      pre { margin: 0; }
      code.hljs { padding: 30px }
    </style>
    <pre><code class="json">${JSON.stringify(
      ctx.body,
      undefined,
      2,
    )}</code></pre>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/ocean.min.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad()</script>
    `

    ctx.type = 'text/html'
  }
}

const auth = async (ctx, next) => {
  const key = ctx.request.header.key

  const playerResp = await SPlayer.fromKey(key, true)

  if (!playerResp) {
    ctx.throw(401)
    return
  }
  const { player, jsonUser } = playerResp

  jsonUser.social = jsonUser.social || {}
  jsonUser.social.requests = jsonUser.social.requests || []
  jsonUser.social.friends = jsonUser.social.friends || []

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
router.post('/user/checkKey', auth, checkKey)
router.get('/user/get', auth, getPlayer)

router.post('/game/reassemble', auth, game.reassemble)
router.post('/game/add', auth, game.add)
router.post('/game/requestItem', auth, game.requestItem)
router.post('/game/swapItems', auth, game.moveItem)
router.post('/game/removefriend', auth, game.removeFriend)
router.post('/game/removerequest', auth, game.removeRequest)
router.post('/game/inviteGame', auth, game.inviteGame)
router.post('/game/acceptInvite', auth, game.acceptInvite)
router.post('/game/createCustomItem', auth, game.createCustomItem)
router.post('/game/markItemSeen', auth, game.markItemSeen)
router.post('/game/fightLevel', auth, game.fightLevel)
router.post('/game/clearNPCs', auth, game.clearNPCs) // Only debugging purpouse
router.get('/game/requestNPCSelectionData', auth, game.requestNPCSelectionData)
router.get('/game/requestInventory', auth, game.requestInventory)
router.get('/game/fight/:id', auth, game.getFight)
router.post('/game/fight-subscribe/:id', auth, game.fightSubscribe)
router.post('/game/fight-unsubscribe/:id', auth, game.fightUnsubscribe)
router.get('/game/social', auth, game.getSocial)
router.get('/game/scoreboard/npcdiff', auth, game.getNpcDifficultyScoreboard)
router.get('/game/scoreboard/pvp', auth, game.getPVPRankScoreboard)

router.get('/gamedata/items', jsonApi, gamedata.items)
router.get('/gamedata/prefixes', jsonApi, gamedata.prefixes)
router.get('/gamedata/type-prefix-map', jsonApi, gamedata.typePrefixMap)
router.get('/gamedata/droptable', jsonApi, gamedata.droptable)
router.get('/gamedata/random-item', jsonApi, gamedata.randomItem)

export default router
