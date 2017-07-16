import bunyan from 'bunyan'
import gelfStream from 'gelf-stream'
import ConsoleFormattedStream from 'bunyan-console-formatted-stream'

const streams = []

const isServer = typeof process !== 'undefined'

if (isServer && process.env.GELF_SERVER) {
  streams.push({
    type: 'raw',
    stream: gelfStream.forBunyan(process.env.GELF_SERVER)
  })
}

if (streams.length === 0) {
  if (isServer) {
    streams.push({
      stream: process.stdout,
      level: 'debug'
    })
  } else {
    streams.push({
      level: 'info',
      stream: new ConsoleFormattedStream(),
      type: 'raw'
    })
  }
}

const log = bunyan.createLogger({
  name: 'textbrawlers',
  serializers: bunyan.stdSerializers,
  streams
})
export default log

export const koaLogger = () => async (ctx, next) => {
  const start = Date.now()
  await next();
  const time = Date.now() - start
  log.info({req: ctx.req, res: ctx.res, time}, 'request finished')
}
