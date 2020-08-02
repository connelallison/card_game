"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var socket = require("socket.io");
var path = require("path");
var ServerPlayer_1 = require("./ServerPlayer");
var ServerEvent_1 = require("./ServerEvent");
// const { Deck, deck1, deck2 } = require("./game/Deck");
var Game_1 = require("./game/Game");
// const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
function testGame(socketID) {
    if (socketID === void 0) { socketID = null; }
    if (Math.floor(Math.random() * 2)) {
        var testGame_1 = new Game_1.default(connectedPlayers[socketID].displayName, 'TestBot', 'TestDeckOne', 'TestDeckTwo', false, true, true, socketID, null, true);
    }
    else {
        var testGame_2 = new Game_1.default(connectedPlayers[socketID].displayName, 'TestBot', 'TestDeckTwo', 'TestDeckOne', false, true, true, socketID, null, true);
    }
    // const gameThread = new Worker('./worker');
    // gameThread.on('message', (message) => {
    //   console.log(message)
    //   console.log('Message received from worker');
    // });
    //
    // const message = () => {
    //   gameThread.postMessage("echo!");
    // }
    // setTimeout(message, 250);
    // console.log('Message posted to worker');
}
function pvpGame(player1SocketID, player2SocketID) {
    if (Math.floor(Math.random() * 2)) {
        var pvpGame_1 = new Game_1.default(connectedPlayers[player1SocketID].displayName, connectedPlayers[player2SocketID].displayName, 'TestDeckOne', 'TestDeckTwo', false, true, true, player1SocketID, player2SocketID);
    }
    else {
        var pvpGame_2 = new Game_1.default(connectedPlayers[player1SocketID].displayName, connectedPlayers[player2SocketID].displayName, 'TestDeckTwo', 'TestDeckOne', false, true, true, player1SocketID, player2SocketID);
    }
}
var app = express();
app.use(express.static(path.join(__dirname, '../client/public')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../client/public/index.html'));
});
var port = process.env.PORT || 4000;
var server = app.listen(port, function () {
    console.log('App is listening on port ' + port);
});
var io = socket(server);
var connectedPlayers = {};
var connectedSockets = {};
io.on('connection', function (socket) {
    console.log('made websocket connection: ', socket.id);
    var socketID = socket.id;
    var serverPlayer = new ServerPlayer_1.default(socketID);
    connectedPlayers[socketID] = serverPlayer;
    connectedSockets[socketID] = socket;
    console.log(connectedPlayers);
    io.emit('serverPlayersUpdate', Object.values(connectedPlayers));
    socket.on('updateDisplayName', function (data) {
        console.log('updateDisplayName request received');
        var oldName = serverPlayer.displayName;
        serverPlayer.displayName = data.displayName;
        console.log(serverPlayer.displayName);
        socket.broadcast.emit('displayNameAnnouncement', {
            message: oldName + " is now: " + serverPlayer.displayName
        });
        io.emit('serverPlayersUpdate', Object.values(connectedPlayers));
    });
    socket.on('requestTestGame', function (opponent) {
        // console.log(`server: newGameStatus:${socketID}`);
        ServerEvent_1.default.on("newGameStatus:" + socketID, function (gameState) {
            // console.log(gameState);
            console.log("server: newGameStatus:" + socketID);
            socket.emit('gameStateUpdate', gameState);
        });
        ServerEvent_1.default.on("newTurnTimer:" + socketID, function (turnTimer) {
            socket.emit('turnTimerUpdate', turnTimer);
        });
        // setTimeout(testGame, 1000, socketID);
        if (!opponent.opponentID || opponent.opponentID === 'TestBot') {
            testGame(socketID);
        }
        else {
            var opponentSocket_1 = connectedSockets[opponent.opponentID];
            ServerEvent_1.default.on("newGameStatus:" + opponent.opponentID, function (gameState) {
                // console.log(gameState);
                console.log("server: newGameStatus:" + opponent.opponentID);
                opponentSocket_1.emit('gameStateUpdate', gameState);
            });
            ServerEvent_1.default.on("newTurnTimer:" + opponent.opponentID, function (turnTimer) {
                opponentSocket_1.emit('turnTimerUpdate', turnTimer);
            });
            pvpGame(socketID, opponent.opponentID);
        }
    });
    socket.on('newMoveRequest', function (moveRequest) {
        // console.log(moveRequest)
        ServerEvent_1.default.emit("playerMoveRequest:" + socketID, moveRequest);
    });
    socket.on('disconnect', function () {
        // connectedPlayers.splice(connectedPlayers.indexOf(serverPlayer), 1);
        delete connectedPlayers[socketID];
        delete connectedSockets[socketID];
        console.log('disconnected: ', socketID);
        io.emit('serverPlayersUpdate', Object.values(connectedPlayers));
    });
    // class ServerEvent extends EventEmitter {}
    // const serverEvent = new ServerEvent();
});
ServerEvent_1.default.on('newGameStatus', function (gameState) {
    // console.log(gameState);
    io.emit('gameStateUpdate', gameState);
});
ServerEvent_1.default.on('newTurnTimer', function (turnTimer) {
    io.emit('turnTimerUpdate', turnTimer);
});
// setTimeout(testGame, 5000);
// io.emit("gameStateUpdate", {
//     started: false,
//     winner: null,
//     myTurn: true,
//     my: {
//       attack: 0,
//       health: 30,
//       currentMana: 3,
//       maxMana: 3,
//       board: [],
//       hand: [],
//       deck: 30
//     },
//     opponent: {
//       attack: 0,
//       health: 30,
//       currentMana: 0,
//       maxMana: 0,
//       board: [],
//       hand: 3,
//       deck: 25
//     },
//     legalMoves: {
//       canAttackWith: {},
//       canPlay: {}
//   }
// })
