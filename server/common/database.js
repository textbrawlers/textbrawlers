import monk from 'monk'

const db = monk(process.env.MONGODB || 'localhost/retardarenan')
export default db

db.then(() => {
    console.log('Connected to database')
  }).catch(err => console.log('Could not connect to database', err))
