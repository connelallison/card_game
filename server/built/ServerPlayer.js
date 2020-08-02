var ServerPlayer = /** @class */ (function () {
    function ServerPlayer(socketID, displayName) {
        if (displayName === void 0) { displayName = 'Anonymous'; }
        this.socketID = socketID;
        this.displayName = displayName;
        this.match = null;
    }
    return ServerPlayer;
}());
module.exports = ServerPlayer;
