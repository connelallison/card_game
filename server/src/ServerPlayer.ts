import Game from "./game/gamePhases/Game"

class ServerPlayer {
  socketID: string
  displayName: string
  match: Game

  constructor (socketID: string, displayName: string = 'Anonymous') {
    this.socketID = socketID
    this.displayName = displayName
    this.match = null
  }
}

export default ServerPlayer
