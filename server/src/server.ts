import * as express from 'express'
import * as socket from 'socket.io'
import * as path from 'path'
import ServerPlayer from './ServerPlayer'
import serverEvent from './ServerEvent'
// const { Deck, deck1, deck2 } = require("./game/Deck");
// To avoid dependency hell, load in GameObject first. Cards also works, as the first thing it does is load in GameObject.
import GameObject from './game/gameObjects/GameObject'
GameObject
// import Cards from './game/dictionaries/Cards'
// Cards
import Game from './game/gamePhases/Game'
import Decks from './game/dictionaries/Decks'
const deckIDs = Object.keys(Decks)
// const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function randomDeckID() {
  const roll = Math.floor(Math.random() * deckIDs.length)
  return deckIDs[roll]
}

function testGame(player: ServerPlayer) {
  const testGame = new Game(player.displayName, 'TestBot', player.deckID, randomDeckID(), false, true, true, player.socketID, null, true)
  testGame.init()

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

function pvpGame(player1: ServerPlayer, player2: ServerPlayer) {
  const pvpGame = new Game(player1.displayName, player2.displayName, player1.deckID, player2.deckID, false, true, true, player1.socketID, player2.socketID)
  pvpGame.init()
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

const connectedPlayers: { [index: string]: ServerPlayer } = {}
const connectedSockets = {}

io.on('connection', function (socket) {
  console.log('made websocket connection: ', socket.id)
  const socketID = socket.id
  const serverPlayer = new ServerPlayer(socketID, randomDeckID())
  connectedPlayers[socketID] = serverPlayer
  connectedSockets[socketID] = socket
  console.log(connectedPlayers)
  socket.emit('updateDecks', Decks)
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
  socket.on('updateDeckID', data => {
    console.log('updateDeckID request received')
    if (deckIDs.includes(data.deckID)) serverPlayer.deckID = data.deckID
  })
  socket.on('requestTestGame', function (opponent: { opponentID: string }) {
    if (!deckIDs.includes(serverPlayer.deckID)) {
      console.log(`challenger player's deck "${serverPlayer.deckID}" does not exist.`)
      return
    }
    if (opponent.opponentID && opponent.opponentID !== 'TestBot' && !deckIDs.includes(connectedPlayers[opponent.opponentID].deckID)) {
      console.log(`challenged player's deck "${connectedPlayers[opponent.opponentID].deckID}" does not exist`)
      return
    }
    const emitGameState = gameState => socket.emit('gameStateUpdate', gameState)
    const emitTurnTimer = turnTimer => socket.emit('turnTimerUpdate', turnTimer)
    serverEvent.removeAllListeners(`newGameStatus:${socketID}`)
    serverEvent.removeAllListeners(`newTurnTimer:${socketID}`)
    serverEvent.on(`newGameStatus:${socketID}`, emitGameState)
    serverEvent.on(`newTurnTimer:${socketID}`, emitTurnTimer)

    // setTimeout(testGame, 1000, socketID);
    if (!opponent.opponentID || opponent.opponentID === 'TestBot') {
      testGame(serverPlayer)
    } else {
      const opponentPlayer = connectedPlayers[opponent.opponentID]
      const opponentSocket = connectedSockets[opponent.opponentID]
      if (opponentPlayer && opponentSocket) {
        const emitOpponentGameState = gameState => opponentSocket.emit('gameStateUpdate', gameState)
        const emitOpponentTurnTimer = turnTimer => opponentSocket.emit('turnTimerUpdate', turnTimer)
        serverEvent.removeAllListeners(`newGameStatus:${opponent.opponentID}`)
        serverEvent.removeAllListeners(`newTurnTimer:${opponent.opponentID}`)
        serverEvent.on(`newGameStatus:${opponent.opponentID}`, emitOpponentGameState)
        serverEvent.on(`newTurnTimer:${opponent.opponentID}`, emitOpponentTurnTimer)
        pvpGame(serverPlayer, opponentPlayer)
      }
    }
  })

  socket.on('newMoveRequest', function (moveRequest) {
    // console.log(moveRequest)
    serverEvent.emit(`playerMoveRequest:${socketID}`, moveRequest)
  })
  socket.on('endTurn', function () {
    serverEvent.emit(`playerEndTurnRequest:${socketID}`)
  })
  socket.on('endGame', () => serverEvent.emit(`playerEndGameRequest:${socketID}`))
  socket.on('disconnect', () => {
    // connectedPlayers.splice(connectedPlayers.indexOf(serverPlayer), 1);
    delete connectedPlayers[socketID]
    delete connectedSockets[socketID]
    console.log('disconnected: ', socketID)
    serverEvent.emit(`playerDisconnected:${socketID}`)
    io.emit('serverPlayersUpdate', Object.values(connectedPlayers))
  })
})

serverEvent.on('newGameStatus', function (gameState) {
  // console.log(gameState);
  io.emit('gameStateUpdate', gameState)
})

serverEvent.on('newTurnTimer', function (turnTimer) {
  io.emit('turnTimerUpdate', turnTimer)
})