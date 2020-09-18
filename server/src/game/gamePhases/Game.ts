import GameObject from '../gameObjects/GameObject'
GameObject // Load GameObject first to avoid circular dependency hell
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
        stats: player.statsReport(),
        passives: player.passivesReport(),
        creations: player.creationsReport(),
        board: player.boardReport(),
        leaderTechnique: player.leaderTechniqueReport(),
        leader: player.leaderReport(),
        hand: player.handReport(),
        deck: player.deck.length
      },
      opponent: {
        stats: player.opponent.statsReport(),
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

  parseActionTargets(actionTargetIDs: string[][]): GameObject[][] {
    return actionTargetIDs.map(actionStepIDs => actionStepIDs.map(targetID => this.gameObjects[targetID]))
  }

  parseOptionChoice(optionChoice: OptionChoiceRequest): OptionChoice {
    return {
      action: optionChoice.action,
      chosenTargets: this.parseActionTargets(optionChoice.chosenTargets)
    }
  }

  executeMoveRequest(moveRequest, player) {
    if (!player.myTurn()) return

    const selected = this.gameObjects[moveRequest.selected.objectID] as Card
    const attackTarget = (moveRequest.attackTarget && this.gameObjects[moveRequest.attackTarget.objectID] as Character) //?? null
    // const attackTarget = moveRequest.attackTarget === null ? null : this.gameObjects[moveRequest.attackTarget.objectID] as Character
    const selectedSlot = (moveRequest.selectedSlot && this.gameObjects[moveRequest.selectedSlot.objectID] as BoardSlot) //?? null
    // const selectedSlot = moveRequest.selectedSlot === null ? null : this.gameObjects[moveRequest.selectedSlot.objectID] as BoardSlot
    const optionChoices: OptionChoice[] = moveRequest.optionChoices?.map(optionChoice => this.parseOptionChoice(optionChoice)) ?? []
    const actionTargets: GameObject[][][] = moveRequest.actionTargets?.map(actionTargets => this.parseActionTargets(actionTargets)) ?? []

    if (selected instanceof Character && selected.inPlay() && attackTarget instanceof Character && attackTarget.inPlay()) {
      // character in play attacking
      this.executeAttackRequest(selected, attackTarget)
    } else if (
      (selected instanceof TechniqueCreation || selected instanceof LeaderTechnique)
      && selected.inPlay()
      && selected.canBeUsed()
      && selected.validateAllOptionChoices(optionChoices)
      && selected.validateAllActionTargets(actionTargets)
    ) {
      // technique in play being used
      this.executeUseRequest(selected, optionChoices, actionTargets)
    } else if (
      selected.zone === 'hand'
      && selected.canBePlayed()
      && selected.validateAllOptionChoices(optionChoices)
      && selected.validateAllActionTargets(actionTargets)
    ) {
      // card in hand being played
      this.executePlayRequest(selected, optionChoices, actionTargets, selectedSlot)
    }
    this.announceGameState()
  }

  executeAttackRequest(selected: Character, attackTarget: Character): void {
    if (Permissions.canAttack(selected, attackTarget)) {
      const attackEvent = new AttackEvent(this, {
        attacker: selected,
        defender: attackTarget,
      })
      this.startSequence('ProposedAttackPhase', attackEvent)
    }
  }

  executeUseRequest(selected: LeaderTechnique | TechniqueCreation, optionChoices: OptionChoice[], actionTargets: GameObject[][][]): void {
    selected.setAllOptionChoices(optionChoices)
    selected.setAllActionTargets(actionTargets)
    const useEvent = new UseEvent(this, {
      player: selected.owner,
      card: selected,
    })
    this.startSequence('UsePhase', useEvent)
  }

  executePlayRequest(selected: Card, optionChoices: OptionChoice[], actionTargets: GameObject[][][], selectedSlot: BoardSlot): void {
    selected.setAllOptionChoices(optionChoices)
    selected.setAllActionTargets(actionTargets)
    const slot = (selected instanceof Follower && selected.validSlots.includes(selectedSlot)) ? { slot: selectedSlot } : null // includes slot if card is follower
    const eventObj = Object.assign({
      player: selected.owner,
      card: selected,
      handIndex: selected.index(),
      handLength: selected.owner.hand.length,
    },
      slot,
    )
    const playEvent = new PlayEvent(this, eventObj)
    this.startSequence('PlayPhase', playEvent)
  }

  executeEndTurnRequest(player: GamePlayer) {
    if (this.activeChild.activePlayer === player) {
      this.activeChild.end()
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
        console.log(`${this.player1.playerName} disconnected - ending game`)
        this.player1.disconnected = true
        this.end()
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
        console.log(`${this.player2.playerName} disconnected - ending game`)
        this.player2.disconnected = true
        this.end()
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

  startNewDeepestPhase(phaseType: PhaseString | 'Sequence', event?: GameEvent | GameEvent[]): void {
    const bottomPhase = this.currentBottomPhase()
    const newPhase = new Phases[phaseType](bottomPhase, event)
    bottomPhase.startChild(newPhase)
  }

  end() {
    if (this.activeChild) this.activeChild.ended = true
    const disconnected = this.player1.disconnected ? this.player1 : this.player2.disconnected ? this.player2 : null

    this.emit('auraReset')
    this.emit('staticApply')
    this.emit('auraEmit0')
    this.emit('auraApply0')
    this.emit('calculateGlobals')
    this.emit('auraEmit1')
    this.emit('auraApply1')
    this.emit('auraEmit2')
    this.emit('auraApply2')
    this.emit('auraEmit3')
    this.emit('auraApply3')
    this.emit('updateArrays')

    if (this.player1.alive() && !this.player2.alive()) {
      this.winner = this.player1.playerName + ' wins'
    } else if (!this.player1.alive() && this.player2.alive()) {
      this.winner = this.player2.playerName + ' wins'
    } else if (!this.player1.alive() && !this.player2.alive()) {
      this.winner = 'draw'
    } else if (disconnected) {
      this.winner = disconnected.opponent.playerName + ' wins because their opponent disconnected'
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
import Permissions from '../dictionaries/Permissions'
import serverEvent from '../../ServerEvent'
import Card from '../gameObjects/Card'
import Character from '../gameObjects/Character'
import { EventEmitter } from 'events'
import PersistentCard from '../gameObjects/PersistentCard'
import TechniqueCreation from '../gameObjects/TechniqueCreation'
import LeaderTechnique from '../gameObjects/LeaderTechnique'
import Deck from '../gameObjects/Deck'
import BoardSlot from '../gameObjects/BoardSlot'
import Follower from '../gameObjects/Follower'
import Sequence from './Sequence'
import EventTypeString from '../stringTypes/EventTypeString'
import GameEvent from './GameEvent'
import { AttackEvent } from './AttackPhase'
import { UseEvent } from './UsePhase'
import { PlayEvent } from './PlayPhase'
import TestBot from '../gameTests/TestBot'
import Phases from '../dictionaries/Phases'
import { PhaseString } from '../stringTypes/DictionaryKeyString'
import { OptionChoice, OptionChoiceRequest } from '../structs/Action'