class ServerPlayer {
  constructor (socketID, displayName = 'Anonymous') {
    this.socketID = socketID
    this.displayName = displayName
    this.match = null
  }
}

module.exports = ServerPlayer
