import GameObject from '../gameObjects/GameObject'
// GameObject // forces GameObject to load in properly
import GamePhase from './GamePhase'

class Game extends GamePhase {
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
  targetRequirements: { [index: string]: TargetRequirementFactory }
  actions: { [index: string]: ActionOperation }
  effectOps: { [index: string]: EffectOperation }
  permissions: Permissions
  utils: Utils
  inPlay: PersistentCard[]
  player1deckID: string
  player2deckID: string
  ended: boolean
  activeChild: Turn
  children: Turn[]
  queuedPhases: Turn[]
  turnNumber: number
  unreportedEvents: GameEvent[]
  winner: string

  constructor(player1name, player2name, player1deckID, player2deckID, botPlayer1 = false, debug = false, online = false, player1socketID = null, player2socketID = null, botPlayer2 = false) {
    super()
    this.event = new EventEmitter()
    this.event.setMaxListeners(250)
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
    this.player1deckID = player1deckID
    this.player2deckID = player2deckID
    this.ended = false
    this.activeChild = null
    this.turnNumber = 0
    this.queuedPhases = []
    this.unreportedEvents = []
    this.winner
  }

  game(): Game {
    return this
  }

  init() {
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
    if (!this.ended) {
      const player1report: any = {}
      const player2report: any = {}
      if (this.player1.socketID) {
        player1report.gameState = this.prepareGameState(this.player1)
        player1report.eventsReport = this.prepareEventsReport(this.player1)
      }
      if (this.player2.socketID) {
        player2report.gameState = this.prepareGameState(this.player2)
        player2report.eventsReport = this.prepareEventsReport(this.player2)
      }
      if (this.player1.socketID) {
        serverEvent.emit(`newGameStatus:${this.player1.socketID}`, player1report)
      }
      if (this.player2.socketID) {
        serverEvent.emit(`newGameStatus:${this.player2.socketID}`, player2report)
      }
      this.unreportedEvents = []
    } else {
      // console.log('game ended - gamestate not being announced')
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

  prepareEventsReport(player: GamePlayer) {
    return this.unreportedEvents.map(event => event.log)
  }

  announceNewTurn() {
    if (this.player1.socketID) {
      serverEvent.emit(`newTurnTimer:${this.player1.socketID}`, this.activeChild.turnLength)
    }
    if (this.player2.socketID) {
      serverEvent.emit(`newTurnTimer:${this.player2.socketID}`, this.activeChild.turnLength)
    }
    //  else {
    //   serverEvent.emit("newTurnTimer", this.turnLength);
    // }
  }

  executeMoveRequest(moveRequest, player) {
    if (player !== this.activeChild.activePlayer) return

    const selected = this.gameObjects[moveRequest.selected.objectID] as Card
    const target = moveRequest.target === null ? null : this.gameObjects[moveRequest.target.objectID] as Card
    const selectedSlot = moveRequest.selectedSlot === null ? null : this.gameObjects[moveRequest.selectedSlot.objectID] as BoardSlot

    if (selected instanceof Character && selected.inPlay()) {
      // character in play attacking
      if (target instanceof Character && target.inPlay()) {
        if (this.permissions.canAttack(selected, target)) {
          const attackEvent = new AttackEvent(this, {
            attacker: selected,
            defender: target,
          })
          this.startSequence('ProposedAttackPhase', attackEvent)
        }
      }
    } else if ((selected instanceof TechniqueCreation || selected instanceof LeaderTechnique) && selected.inPlay() && selected.canBeUsed()) {
      // technique in play being used
      if (!selected.targeted || this.permissions.canTarget(selected, target)) {
        const targets = !selected.targeted ? [] : [target] // includes target if technique is targeted
        const useEvent = new UseEvent(this, {
          controller: selected.owner,
          objectSource: selected,
          targets,
        })
        this.startSequence('UsePhase', useEvent)
      } 
    } else if (selected.zone === 'hand' && selected.canBePlayed()) {
      // card in hand being played
      const slot = selected instanceof Follower && selected.validSlots.includes(selectedSlot) ? {slot: selectedSlot} : {} // includes slot if card is follower
        const targets = !selected.targeted ? [] : [target] // includes target if card is targeted
        const eventObj = Object.assign(slot, {
          player: selected.owner,
          card: selected,
          targets,
        })
        const playEvent = new PlayEvent(this, eventObj)
        this.startSequence('PlayPhase', playEvent)
    }
    this.announceGameState()
  }

  executeEndTurnRequest(player: GamePlayer) {
    if (this.activeChild.activePlayer === player) {
      this.activeChild.end()
      // this.startSequence('EndOfTurnPhase')
    }
  }

  initPlayers() {
    this.player1 = new GamePlayer(this, this.player1name, this.player1socketID)
    this.player2 = new GamePlayer(this, this.player2name, this.player2socketID)
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
    // this.player2.increaseIncome(1)
    // this.player2.refillMoney()
    const player1deck = new Decks[this.player1deckID](this, this.player1) as Deck
    const player2deck = new Decks[this.player2deckID](this, this.player2) as Deck
    player1deck.leader.putIntoPlay()
    player2deck.leader.putIntoPlay()
    player1deck.leaderTechnique.putIntoPlay()
    player2deck.leaderTechnique.putIntoPlay()
    player1deck.passive.putIntoPlay()
    player2deck.passive.putIntoPlay()
    player1deck.cards.forEach(card => card.moveZone('deck'))
    player2deck.cards.forEach(card => card.moveZone('deck'))
    // this.player1.deck = player1deck.cards
    // this.player2.deck = player2deck.cards
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
        this.player1.disconnected = true
        this.ended = true
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
        this.player2.disconnected = true
        this.ended = true
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

  cacheEvent(event: GameEvent, type: EventTypeString): void {
    (this.eventCache[type] as GameEvent[]).push(event)
    this.eventCache.all.push(event)
    this.unreportedEvents.push(event)
  }

  firstTurn(): Turn {
    return new Turn(this, this.player1, 1)
  }

  async start() {
    console.log('starting game')
    await this.sleep(1000)
    this.queuedPhases.push(this.firstTurn())
    while (!this.ended && this.queuedPhases.length > 0) {
      this.startChild(this.queuedPhases.shift())
      this.announceNewTurn()
      this.announceGameState()
      TestBot(this)
      await this.activeChild.endPromise
    }
    this.end()
  }

  startSequence(phaseType: string, event?: GameEvent): void {
    const sequence = new Sequence(this.activeChild)
    const phase = new Phases[phaseType](sequence, event)
    sequence.queuedPhases.push(phase)
    this.activeChild.startChild(sequence)
  }

  startNewDeepestPhase(phaseType: string, event?: GameEvent | GameEvent[]): void {
    const bottomPhase = this.currentBottomPhase()
    const newPhase = new Phases[phaseType](bottomPhase, event)
    bottomPhase.startChild(newPhase)
  }

  end() {
    if (this.activeChild) this.activeChild.ended = true
    const disconnected = this.player1.disconnected ? this.player1 : this.player2.disconnected ? this.player2 : null

    this.emit('auraApply')
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
    this.announceGameState()
    this.ended = true
    this.removeListeners()
    // const logs = this.eventCache.all.map(event => event.log)
    // logs.forEach(log => console.log(log))
    console.log('The game is over. The result is: ' + this.winner)
  }
}

export default Game

import GamePlayer from '../gameObjects/GamePlayer'
import Decks from '../dictionaries/Decks'
import Turn from './Turn'
import ActionOperations from '../dictionaries/ActionOperations'
import EffectOperations from '../dictionaries/EffectOperations'
import Permissions from '../gameSystems/Permissions'
import Utils from '../gameSystems/Utils'
import serverEvent from '../../ServerEvent'
import Card from '../gameObjects/Card'
import Character from '../gameObjects/Character'
import { EventEmitter } from 'events'
import EffectOperation from '../functionTypes/EffectOperation'
import ActionOperation from '../functionTypes/ActionOperation'
import TargetRequirementFactory from '../functionTypes/TargetRequirementFactory'
import TargetRequirements from '../dictionaries/TargetRequirements'
import PersistentCard from '../gameObjects/PersistentCard'
import TechniqueCreation from '../gameObjects/TechniqueCreation'
import LeaderTechnique from '../gameObjects/LeaderTechnique'
import Deck from '../gameObjects/Deck'
import BoardSlot from '../gameObjects/BoardSlot'
import Follower from '../gameObjects/Follower'
import Sequence from './Sequence'
import AttackEvent from '../gameEvents/AttackEvent'
import GameEvent from '../gameEvents/GameEvent'
import Phases from '../dictionaries/Phases'
import PlayEvent from '../gameEvents/PlayEvent'
import TestBot from '../gameTests/TestBot'
import UseEvent from '../gameEvents/UseEvent'
import EventTypeString from '../stringTypes/EventTypeString'

