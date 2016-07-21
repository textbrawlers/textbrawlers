import 'dotenv/config'

import Koa from 'koa'
import Router from 'koa-router'
import convert from 'koa-convert'
import serve from 'koa-static'
import BodyParser from 'koa-bodyparser'

import server from './server/index.js'

const app = new Koa()
const router = new Router()

router.use('/api', server.routes(), server.allowedMethods())

app
  .use(BodyParser())
  .use(convert(serve('./client')))
  .use(router.routes())
  .use(router.allowedMethods())

const port = process.env.PORT || 3000
app.listen(port)
console.log(`Listening on port ${port}`)
