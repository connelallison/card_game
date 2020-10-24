import PvPChallenge from "./Challenge"
import Game from "./game/gamePhases/Game"

export interface ServerPlayerReport {
  socketID: string
  name: string
  nameNum: string
  status: 'game' | 'lobby' | 'challenge'
  opponent?: ServerPlayerReport
}

export interface ChatMessageData {
  senderID: string
  senderName: string
  nameNum: string
  lines: ChatMessageLine[]
}

export interface ChatMessageLine {
  line: string
  time: number
}

class ServerPlayer {
  socketID: string
  displayName: string
  // uniqueDisplayName: string
  nameNum: string
  status: 'game' | 'lobby' | 'challenge'
  opponent: ServerPlayer
  deckID: string
  nameReceived: boolean
  match: Game
  // challenge: PvPChallenge

  constructor(socketID: string, deckID: string, displayName: string = 'Anonymous') {
    this.socketID = socketID
    this.displayName = displayName
    this.deckID = deckID
    this.nameReceived = false
    this.nameNum = '#' + Math.random().toString().substring(2, 6)
    // this.uniqueDisplayName = `${this.displayName}${this.nameNum}`
    this.opponent = null
    this.match = null
    this.status = 'lobby'
  }

  uniqueDisplayName() {
    return this.displayName + this.nameNum
  }

  

  report(): ServerPlayerReport {
    if (this.opponent) {
      return {
        socketID: this.socketID,
        name: this.displayName,
        nameNum: this.nameNum,
        status: this.status,
        opponent: this.opponent?.noOpponentReport() ?? null,
      }
    } else return this.noOpponentReport()
  }

  noOpponentReport(): ServerPlayerReport {
    return {
      socketID: this.socketID,
      name: this.displayName,
      nameNum: this.nameNum,
      status: this.status,
    }
  }
}

export default ServerPlayer
