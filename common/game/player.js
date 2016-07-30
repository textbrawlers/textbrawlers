export default class ServerPlayer {

  constructor(jsonPlayer) {
    this.jsonPlayer = jsonPlayer
  }


  serialize() {
    return this.jsonPlayer
  }

  
}
