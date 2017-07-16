import monk from 'monk'
import log from 'server/common/log.js'

const db = monk(process.env.MONGODB || 'localhost/retardarenan')
export default db

db.then(() => {
  log.info('connected to database')
}).catch(err => log.error({err}, 'could not connect to database'))
