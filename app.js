import Koa from 'koa'
import Router from 'koa-router'
import dotenv from 'dotenv'

process.env.PORT = process.env.PORT || 3000
process.env.MONGODB = process.env.MONGODB || 'localhost/retardarenan'

dotenv.config({
  silent: true
})

const app = new Koa()
const router = new Router()

const port = process.env.PORT
app.listen(port)
console.log(`Listening on port ${port}`)
