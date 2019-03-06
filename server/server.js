const express = require('express');
const socket = require('socket.io');
const path = require('path');
const EventEmitter = require("events");
const ServerPlayer = require("./ServerPlayer.js");
const gameEvent = require("./GameEvent.js")
const { Deck, deck1, deck2 } = require("./game/Deck.js");
const Game = require("./game/Game.js");
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');


const app = express();
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../client/public/index.html'));
});

const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
  console.log('App is listening on port ' + port);
});

const io = socket(server);

const connectedPlayers = [];

io.on('connection', function (socket) {
  console.log('made websocket connection: ', socket.id);
  const socketID = socket.id;
  const serverPlayer = new ServerPlayer(socketID);
  connectedPlayers.push(serverPlayer);
  console.log(connectedPlayers);
  socket.on("updateDisplayName", function (data) {
    console.log("updateDisplayName request received");
    const oldName = serverPlayer.displayName;
    serverPlayer.displayName = data.displayName;
    console.log(serverPlayer.displayName);
    io.emit("displayNameAnnouncement", {
      message: `${oldName} is now: ${serverPlayer.displayName}`
    })
  })
  socket.on('disconnect', (socket) => {
    connectedPlayers.splice(connectedPlayers.indexOf(serverPlayer), 1);
    console.log('disconnected: ', socketID);
  });
  // class GameEvent extends EventEmitter {}
  // const gameEvent = new GameEvent();
})

gameEvent.on("newGameStatus", function (gameState) {
  // console.log(gameState);
  io.emit("gameStateUpdate", gameState);
});

function testGame() {
  const testGame = new Game(deck1, deck2, true, true);
  // const gameThread = new Worker('./worker.js');
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

setTimeout(testGame, 5000);

// io.emit("gameStateUpdate", {
//   gameState: {
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
//     }
//   },
//   legalMoves: {
//     canAttackWith: {},
//     canPlay: {}
//   }
// })
