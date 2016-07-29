import 'dotenv/config'

import Koa from 'koa'
import Router from 'koa-router'
import convert from 'koa-convert'
import serve from 'koa-static'
import BodyParser from 'koa-bodyparser'
import send from 'koa-send'

import server from './server/index.js'

const app = new Koa()
const router = new Router()

router.use('/api', server.routes(), server.allowedMethods())

const indexFile = process.env.NODE_ENV === 'production' ? './index-production.html' : './index.html'

const fallbackRoute = () => {
  return async ctx => {
    await send(ctx, indexFile)
  }
}

app
  .use(BodyParser())
  .use(convert(serve('.')))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(fallbackRoute())

const port = process.env.PORT || 3000
app.listen(port)
console.log(`Listening on port ${port}`)
