const express = require('express')
const socket = require('socket.io')
const path = require('path')
const EventEmitter = require('events')
const ServerPlayer = require('./ServerPlayer.js')
const serverEvent = require('./ServerEvent.js')
// const { Deck, deck1, deck2 } = require("./game/Deck.js");
const Game = require('./game/Game.js')
// const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function testGame (socketID = null) {
  if (Math.floor(Math.random() * 2)) {
    const testGame = new Game(connectedPlayers[socketID].displayName, 'TestBot', 'TestDeckOne', 'TestDeckTwo', false, true, true, socketID, null, true)
  } else {
    const testGame = new Game(connectedPlayers[socketID].displayName, 'TestBot', 'TestDeckTwo', 'TestDeckOne', false, true, true, socketID, null, true)
  }

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

function pvpGame (player1SocketID, player2SocketID) {
  if (Math.floor(Math.random() * 2)) {
    const pvpGame = new Game(connectedPlayers[player1SocketID].displayName, connectedPlayers[player2SocketID].displayName, 'TestDeckOne', 'TestDeckTwo', false, true, true, player1SocketID, player2SocketID)
  } else {
    const pvpGame = new Game(connectedPlayers[player1SocketID].displayName, connectedPlayers[player2SocketID].displayName, 'TestDeckTwo', 'TestDeckOne', false, true, true, player1SocketID, player2SocketID)
  }
}

const app = express()
app.use(express.static(path.join(__dirname, '../client/public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/public/index.html'))
})

const port = process.env.PORT || 4000
const server = app.listen(port, function () {
  console.log('App is listening on port ' + port)
})

const io = socket(server)

const connectedPlayers = {}
const connectedSockets = {}

io.on('connection', function (socket) {
  console.log('made websocket connection: ', socket.id)
  const socketID = socket.id
  const serverPlayer = new ServerPlayer(socketID)
  connectedPlayers[socketID] = serverPlayer
  connectedSockets[socketID] = socket
  console.log(connectedPlayers)
  io.emit('serverPlayersUpdate', Object.values(connectedPlayers))
  socket.on('updateDisplayName', function (data) {
    console.log('updateDisplayName request received')
    const oldName = serverPlayer.displayName
    serverPlayer.displayName = data.displayName
    console.log(serverPlayer.displayName)
    socket.broadcast.emit('displayNameAnnouncement', {
      message: `${oldName} is now: ${serverPlayer.displayName}`
    })
    io.emit('serverPlayersUpdate', Object.values(connectedPlayers))
  })
  socket.on('requestTestGame', function (opponent) {
    // console.log(`server: newGameStatus:${socketID}`);
    serverEvent.on(`newGameStatus:${socketID}`, function (gameState) {
      // console.log(gameState);
      console.log(`server: newGameStatus:${socketID}`)
      socket.emit('gameStateUpdate', gameState)
    })

    serverEvent.on(`newTurnTimer:${socketID}`, function (turnTimer) {
      socket.emit('turnTimerUpdate', turnTimer)
    })
    // setTimeout(testGame, 1000, socketID);
    if (!opponent.opponentID || opponent.opponentID === 'TestBot') {
      testGame(socketID)
    } else {
      const opponentSocket = connectedSockets[opponent.opponentID]
      serverEvent.on(`newGameStatus:${opponent.opponentID}`, function (gameState) {
        // console.log(gameState);
        console.log(`server: newGameStatus:${opponent.opponentID}`)
        opponentSocket.emit('gameStateUpdate', gameState)
      })
      serverEvent.on(`newTurnTimer:${opponent.opponentID}`, function (turnTimer) {
        opponentSocket.emit('turnTimerUpdate', turnTimer)
      })
      pvpGame(socketID, opponent.opponentID)
    }
  })
  socket.on('newMoveRequest', function (moveRequest) {
    // console.log(moveRequest)
    serverEvent.emit(`playerMoveRequest:${socketID}`, moveRequest)
  })
  socket.on('disconnect', () => {
    // connectedPlayers.splice(connectedPlayers.indexOf(serverPlayer), 1);
    delete connectedPlayers[socketID]
    delete connectedSockets[socketID]
    console.log('disconnected: ', socketID)
    io.emit('serverPlayersUpdate', Object.values(connectedPlayers))
  })
  // class ServerEvent extends EventEmitter {}
  // const serverEvent = new ServerEvent();
})

serverEvent.on('newGameStatus', function (gameState) {
  // console.log(gameState);
  io.emit('gameStateUpdate', gameState)
})

serverEvent.on('newTurnTimer', function (turnTimer) {
  io.emit('turnTimerUpdate', turnTimer)
})

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
