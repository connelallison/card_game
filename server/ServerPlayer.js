class ServerPlayer {
  constructor(socketID, displayName="New User") {
    this.socketID = socketID;
    this.displayName = displayName;
    this.match = null;
  }
}

module.exports = ServerPlayer;
