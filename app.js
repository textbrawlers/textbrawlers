import 'dotenv/config'

import http from 'http'
import Koa from 'koa'
import Router from 'koa-router'
import convert from 'koa-convert'
import serve from 'koa-static'
import BodyParser from 'koa-bodyparser'
import send from 'koa-send'

import server from 'server/index.js'
import realtime from 'server/realtime.js'
import * as npcs from 'common/game/npcs.js'
import WebSocket from 'ws'

const app = new Koa()
const router = new Router()

router.use('/api', server.routes(), server.allowedMethods())

const indexFile = process.env.NODE_ENV === 'production' ? './index-production.html' : './index-development.html'

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

const httpServer = http.createServer(app.callback())

const webSocketServer = new WebSocket.Server({server: httpServer})

realtime(webSocketServer)

Promise.all([
  npcs.parseNPCs()
]).then(() => {
  httpServer.listen(3000)
  console.log(`Listening on port ${port}`)

  process.on('unhandledRejection', reason => {
    console.error('Unhandled promise rejection', reason.stack || reason)
  })
}).catch(err => console.error('Error initializing server', err.stack || err))
