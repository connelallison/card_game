import * as express from 'express'
import * as socket from 'socket.io'
import * as path from 'path'
import * as crypto from 'crypto'
import ServerPlayer, { ChatMessageData } from './ServerPlayer'
import serverEvent from './ServerEvent'
// To avoid dependency hell, load in GameObject first. Cards also works, as the first thing it does is load in GameObject.
import GameObject from './game/gameObjects/GameObject'
GameObject
import Cards from './game/dictionaries/Cards'
// Cards
import Game from './game/gamePhases/Game'
import Decks from './game/dictionaries/Decks'
import { performance } from 'perf_hooks'
import PvPChallenge from './Challenge'
import DeckObject from './game/structs/DeckObject'
import { CardIDString } from './game/stringTypes/DictionaryKeyString'

// const before = performance.now()
for (const deckID in Decks) {
  const deck: DeckObject = Decks[deckID]
  deck.cards = deck.cards.map(card => Cards[card].provideReport()).sort((first, second) => GameObject.sortCards(first, second) ? 1 : -1).map(card => card.id as CardIDString)
}
const deckIDs = Object.keys(Decks)
const CardsStatic = Object.fromEntries(Object.entries(Cards).map(([id, card]) => [id, card.provideReport()]))
// console.log(Date.now())
const decksHash = crypto.createHash('sha256').update(JSON.stringify(Decks)).digest('hex')
const cardsHash = crypto.createHash('sha256').update(JSON.stringify(CardsStatic)).digest('hex')
// console.log(Date.now())
// const after = performance.now()
// console.log(decksHash)
// console.log(cardsHash)
// console.log(after - before)

function randomDeckID() {
  const roll = Math.floor(Math.random() * deckIDs.length)
  return deckIDs[roll]
}

function coinFlip(): boolean {
  return !!Math.floor(Math.random() * 2)
}

const testGame = (player: ServerPlayer, testDeck) => {
  player.deckID = (!player.deckID || player.deckID === 'random') ? randomDeckID() : player.deckID
  // const testBotDeckID = testDeck === 'random' ? randomDeckID() : testDeck
  const testBotDeckID = (!testDeck || testDeck === 'random')  ? randomDeckID() : testDeck
  // console.log(testBotDeckID)
  // const testBotDeck = Decks[testBotDeckID]
  // console.log(testBotDeck)
  const testGame = new Game(player.displayName, 'TestBot', Decks[player.deckID], Decks[testBotDeckID], player.socketID)
  testGame.init()
}

const pvpGame = (player1: ServerPlayer, player2: ServerPlayer) => {
  // console.log(player1.deckID)
  // console.log(player2.deckID)
  player1.deckID = player1.deckID === 'random' ? randomDeckID() : player1.deckID
  player2.deckID = player2.deckID === 'random' ? randomDeckID() : player2.deckID
  // console.log(player1.deckID)
  // console.log(player2.deckID)
  const pvpGame = coinFlip()
   ? new Game(player1.displayName, player2.displayName, Decks[player1.deckID], Decks[player2.deckID], player1.socketID, player2.socketID)
   : new Game(player2.displayName, player1.displayName, Decks[player2.deckID], Decks[player1.deckID], player2.socketID, player1.socketID)
  pvpGame.init()
}

const serverPlayersUpdate = () => io.emit('serverPlayersUpdate', Object.values(connectedPlayers).map(player => player.report()))

const startGame = (serverPlayer: ServerPlayer, opponent: { opponentID: string }, testBotDeckID?: string) => {
  if (!deckIDs.includes(serverPlayer.deckID) && serverPlayer.deckID !== 'random') {
    console.log(`challenger player's deck "${serverPlayer.deckID}" does not exist.`)
    return
  }
  if (opponent.opponentID && opponent.opponentID !== 'TestBot' && !deckIDs.includes(connectedPlayers[opponent.opponentID]?.deckID) && connectedPlayers[opponent.opponentID]?.deckID !== 'random') {
    console.log(`challenged player's deck "${connectedPlayers[opponent.opponentID].deckID}" does not exist`)
    return
  }
  const emitEndMulligan = () => connectedSockets[serverPlayer.socketID]?.emit('endMulliganPhase')
  const emitMulligan = mulligan => connectedSockets[serverPlayer.socketID]?.emit('mulliganReport', mulligan)
  const emitGameState = gameState => connectedSockets[serverPlayer.socketID]?.emit('gameStateUpdate', gameState)
  const emitTurnTimer = turnTimer => connectedSockets[serverPlayer.socketID]?.emit('turnTimerUpdate', turnTimer)

  const testBotGame = (!opponent.opponentID || opponent.opponentID === 'TestBot')

  serverEvent.removeAllListeners(`endMulliganPhase:${serverPlayer.socketID}`)
  serverEvent.removeAllListeners(`mulliganReport:${serverPlayer.socketID}`)
  serverEvent.removeAllListeners(`newGameStatus:${serverPlayer.socketID}`)
  serverEvent.removeAllListeners(`newTurnTimer:${serverPlayer.socketID}`)
  serverEvent.removeAllListeners(`gameEnded:${serverPlayer.socketID}`)

  serverEvent.on(`endMulliganPhase:${serverPlayer.socketID}`, emitEndMulligan)
  serverEvent.on(`mulliganReport:${serverPlayer.socketID}`, emitMulligan)
  serverEvent.on(`newGameStatus:${serverPlayer.socketID}`, emitGameState)
  serverEvent.on(`newTurnTimer:${serverPlayer.socketID}`, emitTurnTimer)
  serverEvent.on(`gameEnded:${serverPlayer.socketID}`, winner => {
    connectedSockets[serverPlayer.socketID]?.emit('gameEnded', winner)
    serverPlayer.status = 'lobby'
    serverPlayer.opponent = null
    if (!testBotGame) {
      // if ()
      if (connectedPlayers[opponent.opponentID] && connectedPlayers[opponent.opponentID]) {
        connectedPlayers[opponent.opponentID].status = 'lobby'
        connectedPlayers[opponent.opponentID].opponent = null
      }
      io.emit('testBotAnnouncement', {
        message: `${serverPlayer.uniqueDisplayName()} vs ${connectedPlayers[opponent.opponentID].uniqueDisplayName()}: ${winner}.`
      })
    } else {
      io.emit('testBotAnnouncement', {
        message: `${serverPlayer.uniqueDisplayName()} vs TestBot: ${winner}.`
      })
    }
    serverPlayersUpdate()
  })
  // setTimeout(testGame, 1000, serverPlayer.socketID);
  if (testBotGame) {
    testGame(serverPlayer, testBotDeckID)
  } else {
    const opponentPlayer = connectedPlayers[opponent.opponentID]
    const opponentSocket = connectedSockets[opponent.opponentID]
    if (opponentPlayer && opponentSocket) {
      const emitOpponentEndMulligan = () => opponentSocket?.emit('endMulliganPhase')
      const emitOpponentMulligan = mulligan => opponentSocket?.emit('mulliganReport', mulligan)
      const emitOpponentGameState = gameState => opponentSocket?.emit('gameStateUpdate', gameState)
      const emitOpponentTurnTimer = turnTimer => opponentSocket?.emit('turnTimerUpdate', turnTimer)
      serverEvent.removeAllListeners(`endMulliganPhase:${opponent.opponentID}`)
      serverEvent.removeAllListeners(`mulliganReport:${opponent.opponentID}`)
      serverEvent.removeAllListeners(`newGameStatus:${opponent.opponentID}`)
      serverEvent.removeAllListeners(`newTurnTimer:${opponent.opponentID}`)
      serverEvent.on(`endMulliganPhase:${opponent.opponentID}`, emitOpponentEndMulligan)
      serverEvent.on(`mulliganReport:${opponent.opponentID}`, emitOpponentMulligan)
      serverEvent.on(`newGameStatus:${opponent.opponentID}`, emitOpponentGameState)
      serverEvent.on(`newTurnTimer:${opponent.opponentID}`, emitOpponentTurnTimer)
      serverEvent.on(`gameEnded:${serverPlayer.socketID}`, winner => {
        connectedSockets[opponentPlayer.socketID]?.emit('gameEnded', winner)
      })
      pvpGame(serverPlayer, opponentPlayer)
    }
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

const connectedPlayers: { [index: string]: ServerPlayer } = {}
const connectedSockets: { [index: string]: socket.Socket } = {}

io.on('connection', function (socket) {
  // console.log('made websocket connection: ', socket.id)
  const socketID = socket.id
  const serverPlayer = new ServerPlayer(socketID, randomDeckID())
  connectedPlayers[socketID] = serverPlayer
  connectedSockets[socketID] = socket
  console.log(`${Object.values(connectedPlayers).length} connected`)
  socket.emit('updateDecks', Decks)
  // const before = performance.now()
  socket.emit('updateCards', CardsStatic)
  // const after = performance.now()
  // console.log(after - before)
  serverPlayersUpdate()
  socket.on('updateDisplayName', function (data) {
    // console.log('updateDisplayName request received')
    const oldName = serverPlayer.uniqueDisplayName()
    serverPlayer.displayName = data.displayName
    // console.log(serverPlayer.displayName)
    serverPlayersUpdate()
    if (serverPlayer.nameReceived) {
      socket.broadcast.emit('testBotAnnouncement', {
        message: `${oldName} is now: ${serverPlayer.uniqueDisplayName()}`
      })
    } else {
      socket.broadcast.emit('testBotAnnouncement', {
        message: `${serverPlayer.uniqueDisplayName()} has joined the lobby.`
      })
      serverPlayer.nameReceived = true
    }
  })
  socket.on('updateDeckID', data => {
    // console.log('updateDeckID request received')
    // if (deckIDs.includes(data.deckID) || data.deckID === 'random') serverPlayer.deckID = data.deckID
    if (deckIDs.includes(data.deckID)) serverPlayer.deckID = data.deckID
  })

  // socket.on('updateTestBotDeckID', data => {
  //   if (deckIDs.includes(data.deckID)) serverPlayer.testBotDeckID = data.deckID
  // })

  socket.on('requestTestGame', data => startGame(serverPlayer, data))

  socket.on('sendChatMessage', data => {
    // console.log(data)
    const time = Date.now()
    const message: ChatMessageData = {
      lines: [{ line: data.message, time }],
      senderID: socket.id,
      senderName: serverPlayer.displayName,
      nameNum: serverPlayer.nameNum,
    }
    io.emit('newChatMessage', message)
  })

  socket.on('newMoveRequest', function (moveRequest) {
    // console.log(moveRequest)
    serverEvent.emit(`playerMoveRequest:${socketID}`, moveRequest)
  })
  socket.on('endTurn', function () {
    serverEvent.emit(`playerEndTurnRequest:${socketID}`)
  })
  socket.on('mulliganRequest', mulliganRequest => {
    serverEvent.emit(`playerMulliganRequest:${socketID}`, mulliganRequest)
  })

  socket.on('testBotChallenge', () => {
    if (serverPlayer.status !== 'lobby') return
    serverPlayer.status = 'challenge'
    serverPlayersUpdate()
  })

  socket.on('testBotCancel', () => {
    if (serverPlayer.status !== 'challenge') return
    serverPlayer.status = 'lobby'
    serverPlayersUpdate()
  })

  socket.on('testBotReady', testBotDeckID => {
    serverPlayer.status = 'game'
    socket.emit('gameStarting')
    serverPlayersUpdate()
    startGame(serverPlayer, { opponentID: 'TestBot' }, testBotDeckID)
  })

  socket.on('pvpChallenge', function (opponent: { opponentID: string }) {
    // console.log('challenge received')
    if (serverPlayer.status !== 'lobby' || !opponent.opponentID) return

    // setTimeout(testGame, 1000, socketID);
    if (opponent.opponentID === 'TestBot') {
      serverPlayer.status = 'game'
      // serverPlayer.opponent
      socket.emit('gameStarting')
      serverPlayersUpdate()
      startGame(serverPlayer, opponent)
    } else {
      const opponentPlayer = connectedPlayers[opponent.opponentID]
      const opponentSocket = connectedSockets[opponent.opponentID]
      if (opponentPlayer && opponentSocket && opponentPlayer.status === 'lobby') {
        serverPlayer.status = 'challenge'
        opponentPlayer.status = 'challenge'
        serverPlayer.opponent = opponentPlayer
        opponentPlayer.opponent = serverPlayer
        serverPlayersUpdate()
        serverEvent.on(`challengeCancelled:${socketID}`, id => {
          const name = connectedPlayers[id]?.uniqueDisplayName() ?? 'Your opponent'
          socket.emit('challengeCancelled', { id, name })
          opponentSocket.emit('challengeCancelled', { id, name })
          serverPlayer.status = 'lobby'
          opponentPlayer.status = 'lobby'
          serverPlayer.opponent = null
          opponentPlayer.opponent = null
          serverPlayersUpdate()
        })
        serverEvent.on(`challengeAccepted:${socketID}`, () => {
          socket.emit('challengeAccepted')
        })
        serverEvent.on(`challengeAccepted:${opponent.opponentID}`, () => {
          opponentSocket.emit('challengeAccepted')
        })
        serverEvent.removeAllListeners(`gameStarting:${socketID}`)
        serverEvent.on(`gameStarting:${socketID}`, () => {
          socket.emit('gameStarting')
          opponentSocket.emit('gameStarting')
          serverPlayersUpdate()
          startGame(serverPlayer, { opponentID: opponentPlayer.socketID })
        })

        const pvpChallenge = new PvPChallenge(serverPlayer, opponentPlayer)
        socket.emit('incomingChallenge', { opponent: opponentPlayer.report(), expiry: pvpChallenge.expiry, incoming: false })
        opponentSocket.emit('incomingChallenge', { opponent: serverPlayer.report(), expiry: pvpChallenge.expiry, incoming: true })
      }
    }
  })

  socket.on('acceptChallenge', () => serverEvent.emit(`acceptChallenge:${socketID}`))
  socket.on('cancelChallenge', () => serverEvent.emit(`cancelChallenge:${socketID}`))
  socket.on('readyChallenge', () => serverEvent.emit(`readyChallenge:${socketID}`))
  socket.on('notReadyChallenge', () => serverEvent.emit(`notReadyChallenge:${socketID}`))
  socket.on('endGame', () => serverEvent.emit(`playerEndGameRequest:${socketID}`))
  socket.on('disconnect', () => {
    // connectedPlayers.splice(connectedPlayers.indexOf(serverPlayer), 1);
    console.log('disconnected: ', socketID)
    console.log(`${Object.values(connectedPlayers).length} connected`)
    serverEvent.emit(`playerDisconnected:${socketID}`)
    serverEvent.removeAllListeners(`playerDisconnected:${socketID}`)
    delete connectedPlayers[socketID]
    delete connectedSockets[socketID]
    // io.emit('serverPlayersUpdate', Object.values(connectedPlayers))
    serverPlayersUpdate()
    socket.broadcast.emit('testBotAnnouncement', {
      message: `${serverPlayer.uniqueDisplayName()} has left the lobby.`
    })
  })

})

// serverEvent.on('newGameStatus', function (gameState) {
//   // console.log(gameState);
//   io.emit('gameStateUpdate', gameState)
// })

// serverEvent.on('newTurnTimer', function (turnTimer) {
//   io.emit('turnTimerUpdate', turnTimer)
// })