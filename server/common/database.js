export default const db = monk(process.env.MONGODB || 'localhost/retardarenan')

db.then( => {
    console.log('Connected to database')
  }).catch(err => console.log('Could not connect to database', err))
