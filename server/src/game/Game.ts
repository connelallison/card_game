import GamePlayer from './GamePlayer'
import { create } from './CardLib'
import { deck } from './DeckLib'
import AuraManager from './AuraManager'
import PhaseManager from './PhaseManager'
import Turn from './Turn'
import Constraints from './Constraints'
import Effects from './Effects'
import Permissions from './Permissions'
import Utils from './Utils'
import TestBot from './TestBot'
// import Card from "./Card";
// import Minion from "./Minion";
// import Spell from "./Spell";
// import { Deck, deck1, deck2 } from "./Deck";
// import EventEmitter from 'events'
import serverEvent from '../ServerEvent'
import GameEvent from './GameEvent'
import GameObject from './GameObject'

class Game {
  event: GameEvent
  botPlayer1: boolean
  botPlayer2: boolean
  debug: boolean
  online: boolean
  player1turn: number
  player2turn: number
  gameObjects: object
  player1: any
  player2: any
  // player1: GamePlayer
  // player2: GamePlayer
  auras: AuraManager
  phases: PhaseManager
  constraints: Constraints
  effects: Effects
  permissions: Permissions
  utils: Utils
  inPlay: GameObject[]
  eventCache: object
  player1deckID: string
  player2deckID: string
  gameOver: boolean
  turnLength: number
  // turnTimer
  turn: Turn
  turnNumber: number
  turnCache: Turn[]
  winner: string

  constructor (player1name, player2name, player1deckID, player2deckID, botPlayer1 = false, debug = false, online = false, player1socketID = null, player2socketID = null, botPlayer2 = false) {
    this.event = new GameEvent()
    this.botPlayer1 = botPlayer1
    this.botPlayer2 = botPlayer2
    this.debug = debug
    this.online = online
    this.player1turn = 0
    this.player2turn = 0
    this.gameObjects = {}
    this.player1 = new GamePlayer(this, player1name, player1socketID)
    this.player2 = new GamePlayer(this, player2name, player2socketID)
    this.auras = new AuraManager(this)
    this.phases = new PhaseManager(this)
    this.constraints = new Constraints(this)
    this.effects = new Effects(this)
    this.permissions = new Permissions(this)
    this.utils = new Utils(this)
    this.inPlay = [this.player1.hero, this.player2.hero]
    this.eventCache = { 
      death: [],
      play: [],
      spell: [],
      attack: [],
      damage: [],
      draw: [],
    }
    // this.sequence = []
    // this.sequenceCache = [this.sequence]
    this.player1deckID = player1deckID
    this.player2deckID = player2deckID
    this.gameOver = false
    this.turnLength = 10000
    // this.turnTimer
    this.turn = null
    this.turnNumber = 0
    this.turnCache = []
    this.winner
    this.initPlayers()
    this.initListeners()
    this.mulliganPhase()
    this.start()
  }

  announceGameState () {
    if (this.online) {
      // console.log(serverEvent);
      let player1gameState
      let player2gameState
      if (this.player1.socketID) {
        player1gameState = this.prepareGameState(this.player1)
      }
      if (this.player2.socketID) {
        player2gameState = this.prepareGameState(this.player2)
      }
      // console.log(gameState);
      // console.log(`game: newGameStatus:${this.socketID}`);
      if (this.player1.socketID) {
        serverEvent.emit(`newGameStatus:${this.player1.socketID}`, player1gameState)
      }
      if (this.player2.socketID) {
        serverEvent.emit(`newGameStatus:${this.player2.socketID}`, player2gameState)
      }
      // if (!this.player1.socketID && !this.player2.socketID) {
      //   serverEvent.emit("newGameStatus", gameState);
      // }
    }
  }

  prepareGameState (player) {
    const opponentHand = []
    for (let i = 0; i < player.opponent.hand.length; i++) {
      opponentHand.push({ type: 'unknown' })
    }
    const gameState = {
      started: true,
      winner: this.winner,
      myTurn: player.myTurn(),
      my: {
        hero: player.heroReport(),
        board: player.boardReport(),
        hand: player.handReport(),
        deck: player.deck.length
      },
      opponent: {
        hero: player.opponent.heroReport(),
        board: player.opponent.boardReport(),
        hand: opponentHand,
        deck: player.opponent.deck.length
      },
    }
    return gameState
  }


  announceNewTurn () {
    if (this.player1.socketID) {
      serverEvent.emit(`newTurnTimer:${this.player1.socketID}`, this.turn.turnLength)
    }
    if (this.player2.socketID) {
      serverEvent.emit(`newTurnTimer:${this.player2.socketID}`, this.turn.turnLength)
    }
    //  else {
    //   serverEvent.emit("newTurnTimer", this.turnLength);
    // }
  }

  actionMoveRequest (moveRequest, player) {
    const selected = this.gameObjects[moveRequest.selected.objectID]
    const target = moveRequest.target === null ? null : this.gameObjects[moveRequest.target.objectID]
    if (selected.zone === 'hero' || selected.zone === 'board') {
      if (target === null) throw Error("it's null")
      if (this.permissions.canAttack(selected, target)) {
        this.phases.proposedAttackPhase({
          attacker: selected,
          defender: target,
          cancelled: false,
        })  
      }
    } else if (selected.zone === 'hand') {
      if (!selected.targeted && selected.canBePlayed()) {
        this.phases.playPhase({
          player: selected.owner,
          card: selected,
        })
      } else if (this.permissions.canTarget(selected, target)) {
        this.phases.playPhase({
          player: selected.owner,
          card: selected,
          target,
        })
      }
    }
    // if (player.myTurn() && selected.owner === player) {
    //   if (selected.zone === "hero" || selected.zone === "board" && selected.type === "minion") {
    //     if (selected.canAttackTarget(target)) {
    //       this.phases.proposedAttackPhase({
    //         attacker: selected,
    //         defender: target,
    //         cancelled: false,
    //       })        
    //     }
    //   } else if (selected.zone === "hand") {
    //     if (selected.canBePlayed()) {
    //       this.phases.playPhase({
    //         player: selected.owner,
    //         card: selected,
    //       })
    //     }
    //   }
    // }
    this.announceGameState()
  }

  // findObjectByPlayerIDZoneAndObjectID (params) {
  //   const { playerID, zone, objectID } = params
  //   const player = this.findPlayerbyPlayerID(playerID)
  //   if (zone === "hero" && player.hero.objectID === objectID) {
  //     return player.hero
  //   } else if (zone === "hand" && player.hand.find(card => card.objectID === objectID) !== undefined) {
  //     return player.hand.find(card => card.objectID === objectID)
  //   } else if (zone === "board" && player.board.find(card => card.objectID === objectID) !== undefined) {
  //     return player.board.find(card => card.objectID === objectID)
  //   } else if (zone === "other") {
  //     throw new Error("findObject: other zones NYI")
  //   } else {
  //     console.log(params)
  //     throw new Error("findObject: not found")
  //   }
  // }

  findPlayerbyPlayerID (playerID) {
    if (this.player1.playerID === playerID) {
      return this.player1
    } else if (this.player2.playerID === playerID) {
      return this.player2
    } else {
      console.log("player1: ", this.player1.playerID)
      console.log("player2: ", this.player2.playerID)
      throw new Error(`player ${playerID} not found`)
    }
  }

  async sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

  initPlayers () {
    if (this.botPlayer1) {
      this.player1.bot = true
    } else {
      this.player1.bot = false
    }
    if (this.botPlayer2) {
      this.player2.bot = true
    } else {
      this.player2.bot = false
    }
    this.player1.opponent = this.player2
    this.player2.opponent = this.player1
    this.player1.deck = deck(this, this.player1, this.player1deckID).cards
    this.player2.deck = deck(this, this.player2, this.player2deckID).cards
  }

  initListeners () {
    if (this.player1.socketID) {
      serverEvent.on(`playerMoveRequest:${this.player1.socketID}`, (moveRequest) => {
        this.actionMoveRequest(moveRequest, this.player1)
      })
    }
    if (this.player2.socketID) {
      serverEvent.on(`playerMoveRequest:${this.player2.socketID}`, (moveRequest) => {
        this.actionMoveRequest(moveRequest, this.player2)
      })
    }
  }

  removeListeners () {
    if (this.player1.socketID) {
      serverEvent.removeAllListeners(`playerMoveRequest:${this.player1.socketID}`)
    }
    if (this.player2.socketID) {
      serverEvent.removeAllListeners(`playerMoveRequest:${this.player2.socketID}`)
    }
  }

  mulliganPhase () {
    for (let i = 0; i < 5; i++) {
      this.player1.mulliganDraw()
    }
    for (let i = 0; i < 6; i++) {
      this.player2.mulliganDraw()
    }
  }

  async start () {
    this.player1.board.push(create(this, this.player1, 'board', 'PlayerOneMinion'))
    this.player2.board.push(create(this, this.player2, 'board', 'PlayerTwoMinion'))
    this.inPlay.push(this.player1.board[0])
    this.inPlay.push(this.player2.board[0])
    console.log('starting game')
    await this.sleep(1000)
    this.turnLoop(this.player1)
  }

  async turnLoop (activePlayer: GamePlayer) {
    this.turnNumber++
    this.turn = new Turn(this, activePlayer, this.turnNumber)
    this.turnCache.push(this.turn)
    const nextActivePlayerPromise = this.turn.start()
    this.announceNewTurn()
    this.announceGameState()
    TestBot(this)
    const nextActivePlayer = await nextActivePlayerPromise
    this.announceGameState()
    if (nextActivePlayer) {
      // console.log(nextActivePlayer)
      this.turnLoop(nextActivePlayer)
    }
  }

  endGame () {
    this.turn.over = true
    this.gameOver = true
    if (this.player1.alive() && !this.player2.alive()) {
      this.winner = this.player1.name + ' wins'
    } else if (!this.player1.alive() && this.player2.alive()) {
      this.winner = this.player2.name + ' wins'
    } else if (!this.player1.alive() && !this.player2.alive()) {
      this.winner = 'draw'
    } else {
      throw new Error('endGame() has been called but neither player is dead')
    }
    console.log('The game is over. The result is: ' + this.winner)
    this.announceGameState()
    this.removeListeners()
  }
}

export default Game
