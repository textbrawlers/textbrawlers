// Include modifiers here.

// Add modifiers to array.
const modifiers = [

]

export default class modifierHandler{
  apply(fightData){
    let resp = []
    modifiers.forEach(modifier => {
      resp.push(modifier.apply())
    })
    return resp
  }

  tick(fightData){
    let resp = []
    modifiers.forEach(modifier => {
      resp.push(modifier.tick())
    })
    return resp
  }
}
