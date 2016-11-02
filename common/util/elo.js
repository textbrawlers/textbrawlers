
function calculatePoints (score) {
  const x = score - 1500
  return Math.pow(1.000001, -x * x) * 25
}

export default function calculateNewElo (winner, loser) {
  const kWinner = calculatePoints(winner)
  const kloser = calculatePoints(loser)

  const expectedWinner = 1 / (1 + Math.pow(10, (loser - winner) / 400))
  const expectedLoser = 1 - expectedWinner

  return {
    winner: winner + kWinner * (1 - expectedWinner),
    loser: loser + kloser * (0 - expectedLoser)
  }
}
