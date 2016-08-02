import Monk from 'monk'
import Player from './player.js'

const db = new Monk(process.env.MONGODB || 'localhost/retardarenan')
const users = db.get('users')

export default class ServerPlayer extends Player{
  
  static async fromKey(key) {
    console.log('fromkey', key)
    const jsonPlayer = await users.findOne({ key })
    console.log('jp', jsonPlayer)

    if (jsonPlayer) {
      return new Player(jsonPlayer)
    }
    return undefined
  }

  async save() {
    
  }
}
