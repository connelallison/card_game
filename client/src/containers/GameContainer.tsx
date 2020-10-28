import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import Leader from '../components/Leader'
import PlayerHand from '../components/PlayerHand'
import Deck from '../components/Deck'
import BoardHalf from '../components/BoardHalf'
import GameStatus from '../components/GameStatus'
import StartGame from '../components/StartGame'
import DisplayName from '../components/DisplayName'
import PlayArea from '../components/PlayArea'
import CreationZone from '../components/CreationZone'
import PassiveZone from '../components/PassiveZone'
import LeaderTechnique from '../components/LeaderTechnique'
import PlayerStatus from '../components/PlayerStatus'
import OptionSelections from '../components/OptionSelections'
import EndGame from '../components/EndGame'
import DeckSelection from '../components/DeckSelection'
import Legacy from '../components/Legacy'
import { PlayCard } from '../components/HoverCard'
import socket from '../socket'
import { MoveRequest } from '../structs/MoveRequest'
import { Decks } from '../structs/DeckObject'
import { LobbyPlayerData } from '../structs/LobbyPlayerData'
import MulliganSelections from '../components/MulliganSelections'

interface GameProps {
  offscreen: boolean
  displayName: string
  serverPlayers: LobbyPlayerData[]
  decks: Decks
  deckID: string
  updateDeck: (deckID: string) => void
  updateName: (name: string) => void
}

class GameContainer extends Component {
  props!: GameProps
  socket: SocketIOClient.Socket
  timerID: NodeJS.Timeout
  state
  moveRequest
  actionTargets
  requiresConfirmation
  playCardTimeout
  eventQueue
  finalGameState

  constructor(props: GameProps) {
    super(props)
    this.state = this.baseState()
    this.socket = this.initSocket(socket)
    this.timerID = setInterval(
      () => this.tick(),
      100
    )
    this.moveRequest = {}
    this.actionTargets = null
    this.requiresConfirmation = null
    this.playCardTimeout = null
    this.eventQueue = []
    this.finalGameState = null

    this.handleUpdateDisplayName = this.handleUpdateDisplayName.bind(this)
    this.handleUpdateDeck = this.handleUpdateDeck.bind(this)
    this.handleStartGame = this.handleStartGame.bind(this)
    this.handleEndGame = this.handleEndGame.bind(this)
    this.handleEndTurn = this.handleEndTurn.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
  }

  baseState() {
    return {
      selectionsEnabled: false,
      gameObjects: {},
      playCard: null,
      combatCards: {},
      damageCards: {},
      healingCards: {},
      deathCards: {},
      actionCards: {},
      inGame: false,
      targetSelection: null,
      selected: null,
      validSelections: null,
      myTurn: false,
      turnEnd: 0,
      turnTimer: 0,
      mulligan: null,
      mulliganChoices: null,
      gameState: {
        started: false,
        winner: null,
        my: {
          stats: {
            money: 0,
            income: 0,
            growth: 0,
            debt: 0,
            rent: 0,
            fervour: 0,
            fatigue: 0,
          },
          leader: {
            attack: null,
            health: null,
            armour: null,
            currentMoney: null,
            maxMoney: null,
            canBeSelected: false,
            name: '',
            text: '',
            type: 'Leader',
          },
          leaderTechnique: {
            text: '',
            name: '',
          },
          board: Array(8).fill({ text: '', name: '', type: 'BoardSlot' }),
          creations: [],
          passives: [{
            text: '',
            name: '',
          }],
          legacy: [],
          hand: [],
          deck: [],
        },
        opponent: {
          name: '',
          stats: {
            money: 0,
            income: 0,
            growth: 0,
            debt: 0,
            rent: 0,
            fervour: 0,
            fatigue: 0,
          },
          leader: {
            attack: null,
            health: null,
            currentMoney: null,
            maxMoney: null,
            canBeSelected: false,
            name: '',
            text: '',
            type: 'Leader',
          },
          leaderTechnique: {
            text: '',
            name: '',
          },
          board: Array(8).fill({ text: '', name: '', type: 'BoardSlot' }),
          creations: [],
          passives: [{
            text: '',
            name: '',
          }],
          legacy: [],
          hand: [],
          deck: [],
        }
      },
    }
  }

  initSocket(socket) {
    // console.log('game running initSocket')

    socket.on('gameStarting', () => this.setState(this.baseState()))
    socket.on('disconnect', () => this.onDisconnect())
    socket.on('gameStateUpdate', report => this.updateGameState(report))
    socket.on('turnTimerUpdate', turnEnd => this.updateTurnEnd(turnEnd))
    socket.on('mulliganReport', mulligan => this.mulliganPhase(mulligan))
    socket.on('endMulliganPhase', () => this.endMulliganPhase())

    return socket
  }

  onDisconnect() {
    // console.log('disconnected from websocket connection at ' + Date().toString())
    const newGameState = { ...this.state.gameState }
    newGameState.winner = 'you disconnected'
    this.updateGameState({ gameState: newGameState, eventsReport: [] })
  }

  updateGameState(report) {
    this.finalGameState = report.gameState
    const gameObjects = this.mapGameObjects()
    this.resetMoveRequest()
    const callback = this.eventQueue.length === 0 ? () => { this.animateEvents(report) } : () => { }
    this.eventQueue.push(...report.eventsReport)
    this.setState({
      gameObjects,
      selected: null,
      validSelections: report.validSelections,
      targetSelection: report.validSelections,
      inGame: (this.finalGameState.started && !this.finalGameState.winner),
      selectionsEnabled: (!this.finalGameState.winner && this.state.myTurn),
    }, callback)
  }

  mulliganPhase(mulligan) {
    const mulliganChoices = []
    this.setState({ mulligan, mulliganChoices, selectionsEnabled: true })
  }

  endMulliganPhase() {
    this.setState({ mulligan: null, mulliganChoices: null })
  }

  updateTurnEnd(turnInfo) {
    this.setState(turnInfo)
  }

  updateDecks(decks: Decks) {
    const deckIDs = Object.values(decks).map(deck => deck.id)
    const deckID = deckIDs.includes(localStorage.getItem('deckID') as string) ? localStorage.getItem('deckID') : deckIDs[0]

    this.socket.emit('updateDeckID', { deckID })
    localStorage.setItem('deckID', deckID as string)
    this.setState({ deckID, decks })
  }

  updateServerPlayers(unfilteredServerPlayers) {
    const serverPlayers = unfilteredServerPlayers.filter(player => player.socketID !== this.socket.id)
    this.setState({ serverPlayers })
  }

  handleUpdateDisplayName(displayName) {
    this.socket.emit('updateDisplayName', {
      displayName: displayName
    })
    localStorage.setItem('displayName', displayName)
    this.setState({ displayName })
  }

  handleUpdateDeck(deckID) {
    this.socket.emit('updateDeckID', {
      deckID,
    })
    localStorage.setItem('deckID', deckID)
    this.setState({ deckID })
  }

  handleStartGame(opponentID) {
    if (!this.state.inGame) {
      document.documentElement.requestFullscreen()
      // console.log('starting game')
      this.socket.emit('requestTestGame', {
        opponentID
      })
    } else {
      // console.log('start game button disabled')
    }
  }

  handleEndGame() {
    // console.log(this.state.inGame)
    if (this.state.inGame) this.socket.emit('endGame')
  }

  handleEndTurn() {
    // console.log('ending turn')
    if (this.state.myTurn) this.socket.emit('endTurn')
  }

  async animateEvents(report, delay?) {
    if (delay) await this.sleep(delay)
    if (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift()
      console.log(event)
      if (event.eventType === 'play' || event.eventType === 'use') {
        this.animatePlay(event, report)
      } else if (event.eventType === 'update') {
        this.animateUpdate(event, report)
      } else if (event.eventType === 'attack') {
        this.animateCombat(event, report)
      } else if (event.eventType === 'damage') {
        this.animateDamage(event, report)
      } else if (event.eventType === 'healing') {
        this.animateHealing(event, report)
      } else if (event.eventType === 'death') {
        this.animateDeath(event, report)
      } else if (
        event.eventType === 'actionAction'
        || event.eventType === 'eventAction'
        || event.eventType === 'optionAction'
        || event.eventType === 'deathAction'
        || event.eventType === 'triggerAction'
      ) {
        this.animateAction(event, report)
      } else this.animateEvents(report)
    } else {
      const newState = {
        gameState: this.finalGameState,
        // selected: null,
        // inGame: (this.finalGameState.started && !this.finalGameState.winner),
        // selectionsEnabled: (this.finalGameState.started && !this.finalGameState.winner && this.state.myTurn),
      }
      this.setState(newState, this.updateTargetSelection)
    }
  }

  animatePlay(event, report) {
    if (this.playCardTimeout) clearTimeout(this.playCardTimeout)
    this.playCardTimeout = setTimeout(() => {
      this.setState({ playCard: null })
    }, 4000)
    this.setState({ playCard: event.card }, () => { this.animateEvents(report, 50) })
  }

  animateUpdate(event, report) {
    this.setState({ gameState: event.gameState }, () => { this.animateEvents(report) })
  }

  animateCombat(event, report) {
    const combatCards = this.state.combatCards
    if (combatCards[event.attacker]) {
      clearTimeout(combatCards[event.attacker].timeout)
    }
    if (combatCards[event.defender]) {
      clearTimeout(combatCards[event.defender].timeout)
    }
    const attackerTimeout = setTimeout(() => {
      const combatCards = JSON.parse(JSON.stringify(this.state.combatCards))
      delete combatCards[event.attacker]
      this.setState({ combatCards })
    }, 1500);
    const defenderTimeout = setTimeout(() => {
      const combatCards = JSON.parse(JSON.stringify(this.state.combatCards))
      delete combatCards[event.defender]
      this.setState({ combatCards })
    }, 1500);
    const attacker = {
      objectID: event.attacker,
      timeout: attackerTimeout,
    }
    const defender = {
      objectID: event.defender,
      timeout: defenderTimeout,
    }
    const newCombatCards = { ...combatCards }
    newCombatCards[event.attacker] = attacker
    newCombatCards[event.defender] = defender
    this.setState({ combatCards: newCombatCards }, () => { this.animateEvents(report, 500) })
  }

  animateDamage(event, report) {
    const delay = (this.eventQueue[0] && (this.eventQueue[0].eventType === 'damage' || this.eventQueue[0].eventType === 'death')) ? 100 : 500
    const damageCards = this.state.damageCards
    if (damageCards[event.target]) {
      clearTimeout(damageCards[event.target].timeout)
    }
    const targetTimeout = setTimeout(() => {
      const damageCards = JSON.parse(JSON.stringify(this.state.damageCards))
      delete damageCards[event.target]
      this.setState({ damageCards })
    }, 3000);
    const target = {
      objectID: event.target,
      number: event.damage,
      rot: event.rot,
      timeout: targetTimeout,
      key: Math.random(),
    }
    const newDamageCards = { ...damageCards }
    newDamageCards[event.target] = target
    this.setState({ damageCards: newDamageCards }, () => { this.animateEvents(report, delay) })
  }

  animateHealing(event, report) {
    const delay = (this.eventQueue[0] && this.eventQueue[0].eventType === 'healing') ? 100 : 500
    const healingCards = this.state.healingCards
    if (healingCards[event.target]) {
      clearTimeout(healingCards[event.target].timeout)
    }
    const targetTimeout = setTimeout(() => {
      const healingCards = JSON.parse(JSON.stringify(this.state.healingCards))
      delete healingCards[event.target]
      this.setState({ healingCards })
    }, 3000);
    const target = {
      objectID: event.target,
      number: event.healing,
      nourish: event.nourish,
      timeout: targetTimeout,
      key: Math.random(),
    }
    const newHealingCards = { ...healingCards }
    newHealingCards[event.target] = target
    this.setState({ healingCards: newHealingCards }, () => { this.animateEvents(report, delay) })
  }

  animateDeath(event, report) {
    const delay = (this.eventQueue[0] && this.eventQueue[0].eventType === 'update')
      ? 1000
      : (this.eventQueue[0] && this.eventQueue[0].eventType === 'death')
        ? 0
        : 500
    const deathCards = this.state.deathCards
    if (deathCards[event.card]) {
      clearTimeout(deathCards[event.card].timeout)
    }
    const cardTimeout = setTimeout(() => {
      const deathCards = JSON.parse(JSON.stringify(this.state.deathCards))
      delete deathCards[event.card]
      this.setState({ deathCards })
    }, 2000);
    const card = {
      objectID: event.card,
      timeout: cardTimeout,
      key: Math.random(),
    }
    const newDeathCards = { ...deathCards }
    newDeathCards[event.card] = card
    this.setState({ deathCards: newDeathCards }, () => { this.animateEvents(report, delay) })
  }

  animateAction(event, report) {
    const delay = 1000
    const actionCards = this.state.actionCards
    if (actionCards[event.card]) {
      clearTimeout(actionCards[event.card].timeout)
    }
    const cardTimeout = setTimeout(() => {
      const actionCards = JSON.parse(JSON.stringify(this.state.actionCards))
      delete actionCards[event.card]
      this.setState({ actionCards })
    }, 3000);
    const card = {
      objectID: event.card,
      timeout: cardTimeout,
      key: Math.random(),
    }
    const newDeathCards = { ...actionCards }
    newDeathCards[event.card] = card
    this.setState({ actionCards: newDeathCards }, () => { this.animateEvents(report, delay) })
  }

  initMoveRequest(selected) {
    // console.log(selected)
    // console.log(this.state.gameObjects)
    // console.log(this.state.gameObjects[selected.objectID])
    this.moveRequest = {
      selected: this.state.gameObjects[selected.objectID],
      attackTargets: JSON.parse(JSON.stringify(this.state.gameObjects[selected.objectID].attackTargets || null)),
      validSlots: JSON.parse(JSON.stringify(this.state.gameObjects[selected.objectID].validSlots || null)),
      options: JSON.parse(JSON.stringify(this.state.gameObjects[selected.objectID].options)),
      actions: JSON.parse(JSON.stringify(this.state.gameObjects[selected.objectID].actions))
    }
    if (this.moveRequest.options) this.moveRequest.options.forEach(option => this.flatMappedOption(option))
    this.requiresConfirmation = (this.moveRequest.selected.zone === 'hand' && !this.moveRequest.attackTargets && !this.moveRequest.validSlots && !this.moveRequest.options && !this.actionTargets)
    this.actionTargets = this.moveRequest.actions && this.flatMappedActions(this.moveRequest.actions)
  }

  resetMoveRequest() {
    this.moveRequest = {}
    this.requiresConfirmation = null
    this.actionTargets = null
  }

  checkMoveRequest() {
    // console.log('checking move')
    if (this.moveRequest.selected && this.findNextTargetSelection() === null) this.announceMove()
  }

  mapGameObjects() {
    const gameObjects = {}
    if (!this.finalGameState) return {}
    gameObjects[this.finalGameState.my.leader.objectID] = this.finalGameState.my.leader
    gameObjects[this.finalGameState.opponent.leader.objectID] = this.finalGameState.opponent.leader
    gameObjects[this.finalGameState.my.leaderTechnique.objectID] = this.finalGameState.my.leaderTechnique
    gameObjects[this.finalGameState.opponent.leaderTechnique.objectID] = this.finalGameState.opponent.leaderTechnique
    this.finalGameState.my.board.forEach(object => {
      gameObjects[object.objectID] = object
      if (object.follower) gameObjects[object.follower.objectID] = object.follower
    })
    this.finalGameState.opponent.board.forEach(object => {
      gameObjects[object.objectID] = object
      if (object.follower) gameObjects[object.follower.objectID] = object.follower
    })
    this.finalGameState.my.hand.forEach(object => gameObjects[object.objectID] = object)
    this.finalGameState.opponent.hand.forEach(object => gameObjects[object.objectID] = object)
    this.finalGameState.my.deck.forEach(object => gameObjects[object.objectID] = object)
    this.finalGameState.opponent.deck.forEach(object => gameObjects[object.objectID] = object)
    this.finalGameState.my.legacy.forEach(object => gameObjects[object.objectID] = object)
    this.finalGameState.opponent.legacy.forEach(object => gameObjects[object.objectID] = object)
    this.finalGameState.my.creations.forEach(object => gameObjects[object.objectID] = object)
    this.finalGameState.opponent.creations.forEach(object => gameObjects[object.objectID] = object)
    this.finalGameState.my.passives.forEach(object => gameObjects[object.objectID] = object)
    this.finalGameState.opponent.passives.forEach(object => gameObjects[object.objectID] = object)
    return gameObjects
  }

  nextOption() {
    const slotChoiceRequired = this.moveRequest.validSlots && !this.moveRequest.validSlots.chosenTarget
    const nextOption = (
      !slotChoiceRequired
      && this.moveRequest.options
      && this.moveRequest.options.find(option => !option.chosenTarget || option.actionTargets[option.chosenTarget.objectID].some(target => !target.chosenTarget))
    ) || null
    return nextOption
  }

  nextOptionActionSelection() {
    const nextOption = this.nextOption()
    return nextOption && !nextOption.chosenTarget && nextOption.actions
  }

  nextOptionTargetSelection() {
    const nextOption = this.nextOption()
    if (nextOption) {
      if (!nextOption.chosenTarget) {
        return nextOption
      } else return nextOption.actionTargets[nextOption.chosenTarget.objectID].find(target => !target.chosenTarget)
    }
    return null
  }

  findNextTargetSelection() {
    if (!this.moveRequest.selected) return this.state.validSelections
    else if (this.moveRequest.attackTargets && !this.moveRequest.attackTargets.chosenTarget) return this.moveRequest.attackTargets
    else if (this.moveRequest.validSlots && !this.moveRequest.validSlots.chosenTarget) return this.moveRequest.validSlots
    else if (this.moveRequest.options && this.nextOptionTargetSelection()) return this.nextOptionTargetSelection()
    else if (this.actionTargets && this.actionTargets.length > 0) return this.actionTargets.find(target => !target.chosenTarget) || null
    else if (this.requiresConfirmation) {
      return {
        text: 'Confirm selection.',
        hostile: false,
        validTargets: ['confirm'],
      }
    } else return null
  }

  updateTargetSelection() {
    const targetSelection = this.findNextTargetSelection()
    if (targetSelection !== this.state.targetSelection) {
      const selected = this.currentSelected()
      this.setState({ targetSelection, selected }, this.checkMoveRequest)
    }
  }

  currentSelected() {
    const selected: any[] = []
    if (this.moveRequest.selected) selected.push(this.moveRequest.selected)
    if (this.moveRequest.validSlots && this.moveRequest.validSlots.chosenTarget) selected.push(this.moveRequest.validSlots.chosenTarget)
    selected.push(...this.currentStepSelections())
    return selected.length > 0 ? selected : null
  }

  currentStep() {
    const targetSelection = this.findNextTargetSelection()
    if (targetSelection && targetSelection.step) return targetSelection.step
    else return null
  }

  currentStepSelections() {
    const currentStep = this.currentStep()
    if (currentStep) return currentStep.manualTargets.flatMap(target => target.chosenTarget ? [target.chosenTarget] : [])
    else return []
  }

  handleToggleMulligan(object) {
    let mulliganChoices = this.state.mulliganChoices
    if (mulliganChoices.includes(object)) mulliganChoices = mulliganChoices.filter(choice => choice !== object)
    else mulliganChoices = [...mulliganChoices, object]
    this.setState({ mulliganChoices })
  }

  handleClearSelected(selected) {
    if (selected === this.moveRequest.selected) {
      this.resetMoveRequest()
      // this.setState({
      //   selected: null,
      // }, this.updateTargetSelection)
      this.updateTargetSelection()
    } else if (this.moveRequest.validSlots && selected === this.moveRequest.validSlots.chosenTarget) {
      return this.handleChooseSelected(this.moveRequest.selected)
    } else {
      const currentStep = this.currentStep()
      // console.log('currentStep', currentStep)
      const startIndex = currentStep.manualTargets.findIndex(target => target.chosenTarget === selected)
      // console.log('startIndex', startIndex)
      for (let i = startIndex; i < currentStep.manualTargets.length; i++) {
        currentStep.manualTargets[i].chosenTarget = undefined
      }
      this.updateTargetSelection()
    }
  }

  handleInvalidMove() {
    console.log("invalid move")
  }

  handleChooseSelected(selected) {
    this.initMoveRequest(selected)
    this.updateTargetSelection()
    // this.setState({
    //   selected: [selected],
    // }, this.updateTargetSelection)
  }

  handleChooseTarget(target) {
    const targetSelection = this.findNextTargetSelection()
    targetSelection.chosenTarget = target
    // if (targetSelection === this.moveRequest.validSlots) {
    //   this.setState({
    //     selected: [this.moveRequest.selected, target],
    //   }, this.updateTargetSelection)
    // } else this.updateTargetSelection()
    this.updateTargetSelection()
  }

  handleConfirmation() {
    this.requiresConfirmation = false
    this.updateTargetSelection()
  }

  handleSelection(selection) {
    if (!this.state.selectionsEnabled) return
    if (this.state.selected && this.state.selected.includes(selection)) return this.handleClearSelected(selection)
    else if (selection === 'confirm') return this.handleConfirmation()
    else if (!this.state.targetSelection || !this.state.targetSelection.validTargets.includes(selection.objectID)) return this.handleInvalidMove()
    else if (!this.moveRequest.selected) return this.handleChooseSelected(selection)
    else return this.handleChooseTarget(selection)
  }

  announceMove() {
    this.setState({ selectionsEnabled: false, selected: null, validSelections: null })
    const moveRequest = {
      selected: this.moveRequest.selected.objectID,
      attackTarget: this.moveRequest.attackTargets && this.moveRequest.attackTargets.chosenTarget.objectID,
      selectedSlot: this.moveRequest.validSlots && this.moveRequest.validSlots.chosenTarget.objectID,
      options: this.moveRequest.options && this.moveRequest.options.map(option => this.chosenOptionTargets(option)),
      actions: this.moveRequest.actions && this.moveRequest.actions.map(action => this.chosenActionTargets(action))
    }
    this.socket.emit('newMoveRequest', moveRequest)
    this.resetMoveRequest()
  }

  announceMulligan() {
    this.socket.emit('mulliganRequest', this.state.mulliganChoices.map(choice => choice.objectID))
    this.setState({ mulligan: null, mulliganChoices: null })
  }

  flatMappedOption(option) {
    option.actionTargets = []
    option.hostile = false
    option.validTargets = option.actions.map((action, index) => index)
    option.highlightedTargets = []
    option.actions.forEach((action, index) => {
      action.objectID = index
      action.type = 'OptionAction'
      option.actionTargets[index] = this.flatMappedAction(action)
    })
    return option
  }

  flatMappedActions(actions) {
    return actions.flatMap(action => this.flatMappedAction(action))
  }

  flatMappedAction(action) {
    return action.targetedSteps.flatMap(step => {
      step.action = action
      return this.mappedStep(step)
    })
  }

  mappedStep(step) {
    step.manualTargets.forEach(target => {
      target.step = step
      target.action = step.action
    })
    return step.manualTargets
  }

  chosenOptionTargets(option) {
    return {
      chosenAction: option.chosenTarget.objectID,
      chosenTargets: this.chosenActionTargets(option.chosenTarget)
    }
  }

  chosenActionTargets(action) {
    return action.targetedSteps.map(step => step.manualTargets.map(target => target.chosenTarget.objectID))
  }

  tick() {
    this.setState({
      turnTimer: (this.state.turnEnd - Date.now())
    })
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  render() {
    const selections = {
      selectionsEnabled: this.state.selectionsEnabled,
      selected: this.state.selected,
      targetSelection: this.state.targetSelection,
      gameObjects: this.state.gameObjects,
      handleSelection: this.handleSelection,
    }

    const mulliganChoices = this.state.mulligan ? {
      selectionsEnabled: true,
      selected: this.state.mulliganChoices,
      targetSelection: {
        text: `Select any cards your don't want in your opening hand.`,
        hostile: false,
        validTargets: this.state.mulligan.map(card => card.objectID),
        highlightedTargets: [],
      },
      gameObjects: this.state.gameObjects,
      handleSelection: objectID => this.handleToggleMulligan(objectID)
    } : null

    const animations = {
      combatCards: this.state.combatCards,
      damageCards: this.state.damageCards,
      healingCards: this.state.healingCards,
      deathCards: this.state.deathCards,
      actionCards: this.state.actionCards,
    }

    const selectionText = (this.state.targetSelection && this.state.targetSelection.text) || ''
    const jobDone = (this.state.gameState.started && (!this.state.targetSelection || !this.state.targetSelection.validTargets.length))
    const maxSlots = Math.max(this.state.gameState.my.board.length, this.state.gameState.opponent.board.length)

    return (
      // <div id='gameContainer' className={this.props.offscreen ? 'offscreen' : ''} data-tip='' onContextMenu={event => { event.preventDefault(); event.stopPropagation() }}>
      <div id='gameContainer' className={this.props.offscreen ? 'offscreen' : ''} data-tip=''>
        <ReactTooltip className='target-tooltip' offset={{ right: 10 }} arrowColor='transparent' place='right' >
          {selectionText}
        </ReactTooltip>
        <div className='topBar gameBar'>
          {/* <DisplayName displayName={this.props.displayName} handleSubmit={this.props.updateName} /> */}
          {/* <DeckSelection deckID={this.props.deckID} decks={this.props.decks} updateDeck={this.props.updateDeck} /> */}
          <p className='game-status'>Your deck: {this.props.decks && this.props.decks[this.props.deckID].name}</p>
          {
            this.state.inGame
            ? <EndGame endGame={this.handleEndGame} opponentName={this.state.gameState.opponent.name} />
            // : <StartGame startGame={this.handleStartGame} opponents={this.props.serverPlayers} socketID={this.socket.id} />
            : null
          }
          <GameStatus mulligan={!!this.state.mulligan} winner={this.state.gameState.winner} started={this.state.gameState.started} mine={this.state.myTurn} jobDone={jobDone} turnEnd={this.state.turnTimer} endTurn={this.handleEndTurn} />
        </div>
        <PlayerHand mine={false} selections={selections} animations={animations} contents={this.state.gameState.opponent.hand} />
        <PlayArea selections={selections} >
          {/* <PlayArea selections={selections} requiresConfirmation={this.requiresConfirmation}> */}
          <div className='playerStatusDiv'>
            <PlayerStatus stats={this.state.gameState.opponent.stats} />
          </div>
          <div className='outerPlayArea opponent'>
            <PassiveZone mine={false} selections={selections} animations={animations} contents={this.state.gameState.opponent.passives} />
            <Leader key={this.state.gameState.opponent.leader.objectID || 'enemyLeader'} selections={selections} animations={animations} object={this.state.gameState.opponent.leader} />
            <LeaderTechnique key={this.state.gameState.opponent.leaderTechnique.objectID || 'enemyLeaderTechnique'} selections={selections} animations={animations} object={this.state.gameState.opponent.leaderTechnique} />
            <CreationZone mine={false} selections={selections} animations={animations} contents={this.state.gameState.opponent.creations} />
          </div>
          <div className="innerPlayArea">
            <Legacy mine={false} selections={selections} animations={animations} contents={this.state.gameState.opponent.legacy} />
            <BoardHalf mine={false} maxSlots={maxSlots} selections={selections} animations={animations} contents={this.state.gameState.opponent.board} />
            <Deck mine={false} selections={selections} animations={animations} contents={this.state.gameState.opponent.deck} />
          </div>
          <div className='anchor'>
            {this.state.playCard && <PlayCard object={this.state.playCard} />}
            {mulliganChoices && <MulliganSelections mine announceMulligan={() => this.announceMulligan()} selections={mulliganChoices} animations={animations} contents={this.state.mulligan} />}
            <OptionSelections mine={true} selections={selections} animations={animations} contents={this.nextOptionActionSelection()} />
          </div>
          <div className="innerPlayArea">
            <Legacy mine selections={selections} animations={animations} contents={this.state.gameState.my.legacy} />
            <BoardHalf mine maxSlots={maxSlots} selections={selections} animations={animations} contents={this.state.gameState.my.board} />
            <Deck mine selections={selections} animations={animations} contents={this.state.gameState.my.deck} />
          </div>
          <div className='outerPlayArea player'>
            <PassiveZone mine selections={selections} animations={animations} contents={this.state.gameState.my.passives} />
            <Leader key={this.state.gameState.my.leader.objectID || 'friendlyLeader'} selections={selections} animations={animations} object={this.state.gameState.my.leader} />
            <LeaderTechnique key={this.state.gameState.my.leaderTechnique.objectID || 'friendlyLeaderTechnique'} selections={selections} animations={animations} object={this.state.gameState.my.leaderTechnique} />
            <CreationZone mine selections={selections} animations={animations} contents={this.state.gameState.my.creations} />
          </div>
          <div className='playerStatusDiv'>
            <PlayerStatus stats={this.state.gameState.my.stats} />
          </div>
        </PlayArea>
        <PlayerHand mine selections={selections} animations={animations} contents={this.state.gameState.my.hand} />
      </div>
    )
  }
}

export default GameContainer
