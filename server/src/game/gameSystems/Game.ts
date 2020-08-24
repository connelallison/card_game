import GameObject from '../gameObjects/GameObject'
GameObject // forces GameObject to load in properly

class Game {
  event: EventEmitter
  botPlayer1: boolean
  botPlayer2: boolean
  debug: boolean
  online: boolean
  player1turn: number
  player2turn: number
  gameObjects: { [index: string]: GameObject }
  player1name: string
  player2name: string
  player1socketID: string
  player2socketID: string
  player1: GamePlayer
  player2: GamePlayer
  phases: PhaseManager
  targetRequirements: { [index: string]: TargetRequirementFactory }
  actions: { [index: string]: ActionOperation }
  effectOps: { [index: string]: EffectOperation }
  permissions: Permissions
  utils: Utils
  inPlay: PersistentCard[]
  eventCache: EventCache
  player1deckID: string
  player2deckID: string
  gameOver: boolean
  turnLength: number
  turn: Turn
  turnNumber: number
  turnCache: Turn[]
  winner: string

  constructor(player1name, player2name, player1deckID, player2deckID, botPlayer1 = false, debug = false, online = false, player1socketID = null, player2socketID = null, botPlayer2 = false) {
    this.event = new EventEmitter()
    this.event.setMaxListeners(100)
    this.botPlayer1 = botPlayer1
    this.botPlayer2 = botPlayer2
    this.debug = debug
    this.online = online
    this.player1turn = 0
    this.player2turn = 0
    this.gameObjects = {}
    this.player1name = player1name
    this.player2name = player2name
    this.player1socketID = player1socketID
    this.player2socketID = player2socketID
    this.inPlay = []
    this.eventCache = {
      all: [],
      death: [],
      play: [],
      action: [],
      attack: [],
      damage: [],
      healing: [],
      draw: [],
      enterPlay: [],
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
  }

  init() {
    this.phases = new PhaseManager(this)
    this.targetRequirements = TargetRequirements
    this.actions = ActionOperations
    this.effectOps = EffectOperations
    this.permissions = new Permissions(this)
    this.utils = new Utils(this)
    this.initPlayers()
    this.initListeners()
    this.mulliganPhase()
    this.start()
  }

  announceGameState() {
    if (!this.gameOver) {
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

  prepareGameState(player: GamePlayer) {
    const opponentHand = []
    for (let i = 0; i < player.opponent.hand.length; i++) {
      opponentHand.push({ type: 'unknown' })
    }
    const gameState = {
      started: true,
      winner: this.winner,
      myTurn: player.myTurn(),
      my: {
        passives: player.passivesReport(),
        creations: player.creationsReport(),
        board: player.boardReport(),
        leaderTechnique: player.leaderTechniqueReport(),
        leader: player.leaderReport(),
        hand: player.handReport(),
        deck: player.deck.length
      },
      opponent: {
        passives: player.opponent.passivesReport(),
        creations: player.opponent.creationsReport(),
        board: player.opponent.boardReport(),
        leaderTechnique: player.opponent.leaderTechniqueReport(),
        leader: player.opponent.leaderReport(),
        hand: opponentHand,
        deck: player.opponent.deck.length
      },
    }
    return gameState
  }


  announceNewTurn() {
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

  executeMoveRequest(moveRequest, player) {
    const selected = this.gameObjects[moveRequest.selected.objectID] as Card
    let target = moveRequest.target === null ? null : this.gameObjects[moveRequest.target.objectID] as Card

    if (selected instanceof Character && selected.inPlay()) {
      // character in play attacking
      if (target instanceof Character && target.inPlay()) {
        if (this.permissions.canAttack(selected, target)) {
          this.phases.proposedAttackPhase({
            attacker: selected,
            defender: target,
          })
        }
      }
    } else if ((selected instanceof TechniqueCreation || selected instanceof LeaderTechnique) && selected.inPlay() && selected.canBeUsed()) {
      // ability in play being used
      if (!selected.targeted) {
        this.phases.usePhase({
          player: selected.owner,
          card: selected,
          targets: [],
        })
      } else if (this.permissions.canTarget(selected, target)) {
        this.phases.usePhase({
          player: selected.owner,
          card: selected,
          targets: [target],
        })
      }
    } else if (selected.zone === 'hand' && selected.canBePlayed()) {
      // card in hand being played
      if (!selected.targeted) {
        this.phases.playPhase({
          player: selected.owner,
          card: selected,
          targets: [],
        })
      } else if (this.permissions.canTarget(selected, target)) {
        this.phases.playPhase({
          player: selected.owner,
          card: selected,
          targets: [target],
        })
      }
    }
    this.announceGameState()
  }

  executeEndTurnRequest(player: GamePlayer) {
    if (this.turn.activePlayer === player) {
      const nextActivePlayer = this.turn.end()
      if (nextActivePlayer && !this.gameOver) {
        this.turnLoop(nextActivePlayer)
      }
    }
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  initPlayers() {
    this.player1 = new GamePlayer(this, this.player1name, this.player1socketID)
    this.player2 = new GamePlayer(this, this.player2name, this.player2socketID)
    this.player2.increaseIncome(1)
    this.player2.refillMoney()
    this.player1.opponent = this.player2
    this.player2.opponent = this.player1
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
    const player1deck = new Decks[this.player1deckID](this, this.player1) as Deck
    const player2deck = new Decks[this.player2deckID](this, this.player2) as Deck
    player1deck.leader.putIntoPlay()
    player2deck.leader.putIntoPlay()
    player1deck.passive.putIntoPlay()
    player2deck.passive.putIntoPlay()
    this.player1.deck = player1deck.cards
    this.player2.deck = player2deck.cards
  }

  initListeners() {
    if (this.player1.socketID) {
      serverEvent.on(`playerMoveRequest:${this.player1.socketID}`, (moveRequest) => {
        this.executeMoveRequest(moveRequest, this.player1)
      })
      serverEvent.on(`playerEndTurnRequest:${this.player1.socketID}`, () => {
        this.executeEndTurnRequest(this.player1)
      })
      serverEvent.on(`playerDisconnected:${this.player1.socketID}`, () => {
        console.log(`${this.player1.name} disconnected - ending game`)
        this.endGame(this.player1)
      })
    }
    if (this.player2.socketID) {
      serverEvent.on(`playerMoveRequest:${this.player2.socketID}`, (moveRequest) => {
        this.executeMoveRequest(moveRequest, this.player2)
      })
      serverEvent.on(`playerEndTurnRequest:${this.player2.socketID}`, () => {
        this.executeEndTurnRequest(this.player2)
      })
      serverEvent.on(`playerDisconnected:${this.player2.socketID}`, () => {
        console.log(`${this.player2.name} disconnected - ending game`)
        this.endGame(this.player2)
      })
    }
  }

  removeListeners() {
    if (this.player1.socketID) {
      serverEvent.removeAllListeners(`playerMoveRequest:${this.player1.socketID}`)
      serverEvent.removeAllListeners(`playerEndTurnRequest:${this.player1.socketID}`)
      serverEvent.removeAllListeners(`playerDisconnected:${this.player1.socketID}`)
    }
    if (this.player2.socketID) {
      serverEvent.removeAllListeners(`playerMoveRequest:${this.player2.socketID}`)
      serverEvent.removeAllListeners(`playerEndTurnRequest:${this.player2.socketID}`)
      serverEvent.removeAllListeners(`playerDisconnected:${this.player2.socketID}`)
    }
  }

  mulliganPhase() {
    for (let i = 0; i < 5; i++) {
      this.player1.mulliganDraw()
    }
    for (let i = 0; i < 6; i++) {
      this.player2.mulliganDraw()
    }
  }

  async start() {
    // this.player1.board.push(new Cards.PlayerOneFollower(this, this.player1, 'board'))
    // this.inPlay.push(this.player1.board[0])
    // this.player2.board.push(new Cards.PlayerTwoFollower(this, this.player2, 'board'))
    // this.inPlay.push(this.player2.board[0])
    console.log('starting game')
    await this.sleep(1000)
    this.turnLoop(this.player1)
  }

  async turnLoop(activePlayer: GamePlayer) {
    this.turnNumber++
    this.turn = new Turn(this, activePlayer, this.turnNumber)
    this.turnCache.push(this.turn)
    this.turn.start()
    const nextActivePlayerPromise = this.turn.sleep()
    this.announceNewTurn()
    this.announceGameState()
    TestBot(this)
    const nextActivePlayer = await nextActivePlayerPromise
    this.announceGameState()
    if (nextActivePlayer && !this.gameOver) {
      this.turnLoop(nextActivePlayer)
    }
  }

  endGame(disconnected?: GamePlayer) {
    this.turn.over = true
    if (this.player1.alive() && !this.player2.alive()) {
      this.winner = this.player1.name + ' wins'
    } else if (!this.player1.alive() && this.player2.alive()) {
      this.winner = this.player2.name + ' wins'
    } else if (!this.player1.alive() && !this.player2.alive()) {
      this.winner = 'draw'
    } else if (disconnected) {
      this.winner = disconnected.opponent.name + ' wins because their opponent disconnected'
    } else {
      throw new Error('endGame() has been called but neither player is dead')
    }
    console.log('The game is over. The result is: ' + this.winner)
    this.announceGameState()
    this.gameOver = true
    this.removeListeners()
  }
}

export default Game

import GamePlayer from '../gameObjects/GamePlayer'
import Cards from '../dictionaries/Cards'
import Decks from '../dictionaries/Decks'
import PhaseManager from './PhaseManager'
import Turn from '../gameObjects/Turn'
import ActionOperations from '../dictionaries/ActionOperations'
import EffectOperations from '../dictionaries/EffectOperations'
import Permissions from './Permissions'
import Utils from './Utils'
import TestBot from '../gameTests/TestBot'
import serverEvent from '../../ServerEvent'
import Card from '../gameObjects/Card'
import Character from '../gameObjects/Character'
import { EventEmitter } from 'events'
import EventCache from '../gameEvents/EventCache'
import EffectOperation from '../functionTypes/EffectOperation'
import ActionOperation from '../functionTypes/ActionOperation'
import TargetRequirementFactory from '../functionTypes/TargetRequirementFactory'
import TargetRequirements from '../dictionaries/TargetRequirements'
import PersistentCard from '../gameObjects/PersistentCard'
import TechniqueCreation from '../gameObjects/TechniqueCreation'
import LeaderTechnique from '../gameObjects/LeaderTechnique'
import Deck from '../gameObjects/Deck'

