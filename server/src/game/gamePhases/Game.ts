import GameObject from '../gameObjects/GameObject'
GameObject // Load GameObject first to avoid circular dependency hell
import GamePhase from './GamePhase'

class Game extends GamePhase {
  event: EventEmitter
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
  player1deck: DeckObject
  player2deck: DeckObject
  ended: boolean
  activeChild: Turn
  children: Turn[]
  queuedPhases: Turn[]
  // turnNumber: number
  // unreportedEvents: GameEvent[]
  unreportedEvents: any[]
  winner: string

  constructor(player1name: string, player2name: string, player1deck: DeckObject, player2deck: DeckObject, player1socketID: string, player2socketID: string = null) {
    super()
    this.event = new EventEmitter()
    this.event.setMaxListeners(1000)
    this.player1turn = 0
    this.player2turn = 0
    this.gameObjects = {}
    this.player1name = player1name
    this.player2name = player2name
    this.player1socketID = player1socketID
    this.player2socketID = player2socketID
    this.inPlay = []
    this.player1deck = player1deck
    this.player2deck = player2deck
    this.ended = false
    this.activeChild = null
    // this.turnNumber = 0
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
    this.announceGameState()
    // this.mulliganPhase
    // this.mulliganPhase()
    this.start()
  }

  announceGameState() {
    if (!this.ended) {
      this.emit('updateTargets')
      const player1report: any = {}
      const player2report: any = {}
      player1report.gameState = this.prepareGameState(this.player1)
      player1report.eventsReport = this.prepareEventsReport(this.player1)
      player1report.validSelections = this.player1.validSelectionsReport()
      player2report.gameState = this.prepareGameState(this.player2)
      player2report.eventsReport = this.prepareEventsReport(this.player2)
      player2report.validSelections = this.player2.validSelectionsReport()
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

  mulliganReport() {
    if (this.player1.socketID) {
      const player1mulligan = this.player1.deck.slice(0, 5).map(card => card.provideReport())
      serverEvent.emit(`mulliganReport:${this.player1.socketID}`, player1mulligan)
    }
    if (this.player2.socketID) {
      const player2mulligan = this.player2.deck.slice(0, 6).map(card => card.provideReport())
      serverEvent.emit(`mulliganReport:${this.player2.socketID}`, player2mulligan)
    }
  }

  
  endMulliganPhase() {
    if (this.player1.socketID) {
      serverEvent.emit(`endMulliganPhase:${this.player1.socketID}`)
    }
    if (this.player2.socketID) {
      serverEvent.emit(`endMulliganPhase:${this.player2.socketID}`)
    }
  }

  prepareGameState(player: GamePlayer) {
    const opponentHand = []
    for (let i = 0; i < player.opponentPlayer.hand.length; i++) {
      opponentHand.push({ name: 'Unknown Card', type: 'unknown' })
    }
    const opponentDeck = []
    for (let i = 0; i < player.opponentPlayer.deck.length; i++) {
      opponentDeck.push({ name: 'Unknown Card', type: 'unknown' })
    }
    const gameState = {
      started: true,
      winner: this.winner,
      my: {
        stats: player.statsReport(),
        passives: player.passivesReport(),
        creations: player.creationsReport(),
        board: player.boardReport(),
        leaderTechnique: player.leaderTechniqueReport(),
        leader: player.leaderReport(),
        legacy: player.legacyReport(),
        hand: player.handReport(),
        deck: player.deckReport(),
        objectID: player.objectID,
      },
      opponent: {
        name: player.opponentPlayer.playerName,
        stats: player.opponentPlayer.statsReport(),
        passives: player.opponentPlayer.passivesReport(),
        creations: player.opponentPlayer.creationsReport(),
        board: player.opponentPlayer.boardReport(),
        leaderTechnique: player.opponentPlayer.leaderTechniqueReport(),
        leader: player.opponentPlayer.leaderReport(),
        legacy: player.opponentPlayer.legacyReport(),
        hand: opponentHand,
        deck: opponentDeck,
        objectID: player.opponentPlayer.objectID,
      },
    }
    return gameState
  }

  prepareEventsReport(player: GamePlayer, localisation: LocalisationString = 'english') {
    // return this.unreportedEvents.map(event => event.log)
    const observer = (player === this.player1) ? 'player1' : 'player2'
    return this.unreportedEvents.map(event => {
      if (event[localisation].hasOwnProperty('player1')) {
        return event[localisation][observer]
      } else {
        return event[localisation]
      }
    })
  }

  announceNewTurn() {
    if (this.player1.socketID) {
      serverEvent.emit(`newTurnTimer:${this.player1.socketID}`, {
        turnEnd: this.activeChild.turnEnd,
        myTurn: this.player1.myTurn(),
      })
    }
    if (this.player2.socketID) {
      serverEvent.emit(`newTurnTimer:${this.player2.socketID}`, {
        turnEnd: this.activeChild.turnEnd,
        myTurn: this.player2.myTurn(),
      })
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
      chosenAction: optionChoice.chosenAction,
      chosenTargets: this.parseActionTargets(optionChoice.chosenTargets)
    }
  }

  executeMoveRequest(moveRequest: MoveRequest, player: GamePlayer) {
    if (!player.myTurn()) return
    // const before = performance.now()

    const selected = this.gameObjects[moveRequest.selected] as Card
    const attackTarget = moveRequest.attackTarget && this.gameObjects[moveRequest.attackTarget] as Character
    const selectedSlot = moveRequest.selectedSlot && this.gameObjects[moveRequest.selectedSlot] as BoardSlot
    const options: OptionChoice[] = moveRequest.options?.map(optionChoice => this.parseOptionChoice(optionChoice)) ?? []
    const actions: GameObject[][][] = moveRequest.actions?.map(actionTargets => this.parseActionTargets(actionTargets)) ?? [[[]]]

    if (!selected) {
      console.log('Move request with no selected: ', JSON.stringify(moveRequest))
    } else if (selected instanceof Character && selected.inPlay() && attackTarget instanceof Character && attackTarget.inPlay()) {
      // character in play attacking
      this.executeAttackRequest(selected, attackTarget)
    } else if (
      (selected instanceof TechniqueCreation || selected instanceof LeaderTechnique)
      && selected.inPlay()
      && selected.canBeUsed()
      && selected.validateAllOptionChoices(options)
      && selected.validateAllActionTargets(actions)
    ) {
      // technique in play being used
      this.executeUseRequest(selected, options, actions)
    } else if (
      selected.zone === 'hand'
      && selected.canBePlayed()
      && selected.validateAllOptionChoices(options)
      && selected.validateAllActionTargets(actions)
    ) {
      // card in hand being played
      this.executePlayRequest(selected, options, actions, selectedSlot)
    } else {
      console.log(moveRequest)
    }
    this.announceGameState()
    // const after = performance.now()
    // console.log(after - before, 'ms')
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

  executePlayRequest(selected: Card, options: OptionChoice[], actions: GameObject[][][], selectedSlot: BoardSlot): void {
    selected.setAllOptionChoices(options)
    selected.setAllActionTargets(actions)
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

  executeMulliganRequest(mulliganRequest: string[], player: GamePlayer) {
    const playerNum = player === this.player1 ? 'player1' : 'player2'
    if (this.activeChild instanceof PreGameTurn && !this.activeChild[`${playerNum}ready`]) {
      const size = player === this.player1 ? 5 : 6
      const mulliganCards = player.deck.slice(0, size)
      const mulliganChoices = mulliganRequest.map(objectID => this.gameObjects[objectID]) as Card[]
      if (mulliganChoices.every(card => mulliganCards.includes(card))) {
        const remainingCards = mulliganCards.filter(card => !mulliganChoices.includes(card))
        const replacedCount = mulliganCards.length - remainingCards.length
        const removedIDs = mulliganChoices.map(card => card.id)
        remainingCards.forEach(card => card.moveZone('hand'))
        player.deck.filter(card => !removedIDs.includes(card.id)).slice(0, replacedCount).forEach(card => card.moveZone('hand'))
      }
      (this.activeChild as PreGameTurn).playerReady(player)
    }
  }

  initPlayers() {
    this.player1 = new GamePlayer(this, this.player1name, this.player1socketID)
    this.player2 = new GamePlayer(this, this.player2name, this.player2socketID)
    this.player1.opponentPlayer = this.player2
    this.player2.opponentPlayer = this.player1
    this.player1.bot = !this.player1.socketID
    this.player2.bot = !this.player2.socketID
    const player1deck = new Deck(this, this.player1, this.player1deck)
    const player2deck = new Deck(this, this.player2, this.player2deck)
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
      serverEvent.removeAllListeners(`playerMoveRequest:${this.player1.socketID}`)
      serverEvent.on(`playerMoveRequest:${this.player1.socketID}`, (moveRequest) => {
        this.executeMoveRequest(moveRequest, this.player1)
      })
      serverEvent.removeAllListeners(`playerEndTurnRequest:${this.player1.socketID}`)
      serverEvent.on(`playerEndTurnRequest:${this.player1.socketID}`, () => {
        this.executeEndTurnRequest(this.player1)
      })
      serverEvent.removeAllListeners(`playerMulliganRequest:${this.player1.socketID}`)
      serverEvent.on(`playerMulliganRequest:${this.player1.socketID}`, mulliganRequest => {
        this.executeMulliganRequest(mulliganRequest, this.player1)
      })
      serverEvent.removeAllListeners(`playerEndGameRequest:${this.player1.socketID}`)
      serverEvent.on(`playerEndGameRequest:${this.player1.socketID}`, () => {
        console.log(`${this.player1.playerName} conceded - ending game`)
        this.player1.conceded = true
        this.end()
      })
      serverEvent.on(`playerDisconnected:${this.player1.socketID}`, () => {
        console.log(`${this.player1.playerName} disconnected - ending game`)
        this.player1.disconnected = true
        this.end()
      })
    }
    if (this.player2.socketID) {
      serverEvent.removeAllListeners(`playerMoveRequest:${this.player2.socketID}`)
      serverEvent.on(`playerMoveRequest:${this.player2.socketID}`, (moveRequest) => {
        this.executeMoveRequest(moveRequest, this.player2)
      })
      serverEvent.removeAllListeners(`playerEndTurnRequest:${this.player2.socketID}`)
      serverEvent.on(`playerEndTurnRequest:${this.player2.socketID}`, () => {
        this.executeEndTurnRequest(this.player2)
      })
      serverEvent.removeAllListeners(`playerMulliganRequest:${this.player2.socketID}`)
      serverEvent.on(`playerMulliganRequest:${this.player2.socketID}`, mulliganRequest => {
        this.executeMulliganRequest(mulliganRequest, this.player2)
      })
      serverEvent.removeAllListeners(`playerEndGameRequest:${this.player2.socketID}`)
      serverEvent.on(`playerEndGameRequest:${this.player2.socketID}`, () => {
        console.log(`${this.player2.playerName} conceded - ending game`)
        this.player2.conceded = true
        this.end()
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
      serverEvent.removeAllListeners(`playerEndGameRequest:${this.player1.socketID}`)
      // serverEvent.removeAllListeners(`newGameStatus:${this.player1.socketID}`)
      // serverEvent.removeAllListeners(`newTurnTimer:${this.player1.socketID}`)
    }
    if (this.player2.socketID) {
      serverEvent.removeAllListeners(`playerMoveRequest:${this.player2.socketID}`)
      serverEvent.removeAllListeners(`playerEndTurnRequest:${this.player2.socketID}`)
      serverEvent.removeAllListeners(`playerDisconnected:${this.player2.socketID}`)
      serverEvent.removeAllListeners(`playerEndGameRequest:${this.player2.socketID}`)
      // serverEvent.removeAllListeners(`newGameStatus:${this.player2.socketID}`)
      // serverEvent.removeAllListeners(`newTurnTimer:${this.player2.socketID}`)
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
    event.generateLog()
    event.generateReport('english')
    this.unreportedEvents.push(event.reports)
  }

  async start() {
    console.log('starting game')
    // await this.sleep(1000)
    // this.queuedPhases.push(this.preGameTurn())
    const preGame =  new PreGameTurn(this)
    // preGame.
    this.startChild(preGame)
    // this.startSequence('StartOfGamePhase')
    await this.activeChild.endPromise
    this.queuedPhases.push(new Turn(this, this.player1, 1))
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
    const conceded = this.player1.conceded ? this.player1 : this.player2.conceded ? this.player2 : null

    this.emit('auraReset')
    this.emit('staticApply')
    this.emit('auraEmit0')
    this.emit('auraApply0')
    this.emit('calculateGlobals')
    this.emit('auraEmit1')
    this.emit('auraApply1')
    this.emit('auraEmit2')
    this.emit('auraApply2')
    this.emit('applyPassionate')
    this.emit('applyInherited')
    this.emit('auraEmit3')
    this.emit('auraApply3')
    this.emit('finishUpdate')

    if (this.player1.alive() && !this.player2.alive()) {
      this.winner = this.player1.playerName + ' wins'
    } else if (!this.player1.alive() && this.player2.alive()) {
      this.winner = this.player2.playerName + ' wins'
    } else if (!this.player1.alive() && !this.player2.alive()) {
      this.winner = 'draw'
    } else if (disconnected) {
      this.winner = disconnected.playerName + ' disconnected'
    } else if (conceded) {
      this.winner = conceded.playerName + ' conceded'
    } else {
      throw new Error('endGame() has been called but neither player is dead')
    }
    this.announceGameState()
    serverEvent.emit(`gameEnded:${this.player1.socketID}`, this.winner)
    serverEvent.emit(`gameEnded:${this.player2.socketID}`, this.winner)
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
import { MoveRequest } from '../structs/ObjectReport'
import { LocalisationString } from '../structs/Localisation'
import { performance } from 'perf_hooks'
import DeckObject from '../structs/DeckObject'
import { CardEffects } from '../dictionaries/Effects'
import PreGameTurn from './PreGameTurn'

