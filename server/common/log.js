import bunyan from 'bunyan'
import gelfStream from 'gelf-stream'

const streams = []

if (process.env.GELF_SERVER) {
  streams.push({
    type: 'raw',
    stream: gelfStream.forBunyan(process.env.GELF_SERVER)
  })
}

if (streams.length === 0) {
  streams.push({
    stream: process.stdout,
    level: 'debug'
  })
}

const log = bunyan.createLogger({
  name: 'textbrawlers',
  serializers: bunyan.stdSerializers,
  streams
})
export default log

export const koaLogger = () => async (ctx, next) => {
  await next();
  log.info({req: ctx.req, res: ctx.res}, 'request finished')
}
