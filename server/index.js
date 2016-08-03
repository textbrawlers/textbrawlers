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
/*
const fightApi = require('./api/fight.js')
const userApi = require('./api/user.js')
const items = require('./items.js')
const game = require('./game.js')
const admin = require('./admin.js')
const Player = require('./player.js')
const prefixes = require('./prefixes.js')
const statNames = require('./items/stat-names.json')

const app = new Koa()

app.use(function * (next) {
  try {
    yield next
  } catch (err) {
    console.log(err)
    this.status = err.status || 500
    this.body = err.message
    this.app.emit('error', err, this)
  }
})

app.use(KoaStatic('./front'))

app.use(function * (next) {
  this.set('Access-Control-Allow-Origin', '*')
  yield next
})

const router = new Router({
  prefix: '/api'
})

const koaBody = new KoaBody()

function * auth (next) {
  const key = this.request.header.key
  this.player = yield Player.find(key)

  if (this.player) {
    yield next
  } else {
    this.throw(401)
  }
}

router.get('/fight/:a/:b', fightApi.fight)
router.post('/user/login', koaBody, userApi.login)
router.post('/user/register', koaBody, userApi.register)
router.get('/game/inventory', koaBody, auth, game.inventory)
router.post('/admin/spawnitem', koaBody, auth, admin.spawnitem)
router.post('/game/inventory/switch', koaBody, auth, game.inventorySwitch)
router.post('/game/inventory/reassemble', koaBody, auth, game.reassemble)

router.get('/admin/refresh', function * () {
  const spawn = require('child_process').spawn

  let data = ''

  const ls = spawn('git', ['pull'])
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
  this.body = 'refreshing'
})

router.get('/data/items', function * () {
  this.body = items.allItems
})

router.get('/data/prefixes', function * () {
  this.body = prefixes
})

router.get('/data/stat-names', function * () {
  this.body = statNames
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
*/
