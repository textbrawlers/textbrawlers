const Koa = require('koa')
const KoaStatic = require('koa-static')
const Router = require('koa-router')
const KoaBody = require('koa-body')

const fightApi = require('./api/fight.js')
const userApi = require('./api/user.js')

const app = new Koa()

app.use(KoaStatic('./front'))

app.use(function * (next) {
  this.set('Access-Control-Allow-Origin', '*')

  yield next
})

const router = new Router({
  prefix: '/api'
})

const koaBody = new KoaBody()

router.get('/fight/:a/:b', fightApi.fight)
router.post('/user/login', koaBody, userApi.login)
router.post('/user/register', koaBody, userApi.register)

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
