import Game from "./game/gamePhases/Game"

class ServerPlayer {
  socketID: string
  displayName: string
  deckID: string
  match: Game

  constructor (socketID: string, deckID: string, displayName: string = 'Anonymous') {
    this.socketID = socketID
    this.displayName = displayName
    this.deckID = deckID
    this.match = null
  }
}

export default ServerPlayer
