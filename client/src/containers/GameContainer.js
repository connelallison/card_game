import React, { Component } from 'react'
import Leader from '../components/Leader'
// import OpponentHand from '../components/OpponentHand'
import PlayerHand from '../components/PlayerHand'
import Deck from '../components/Deck'
import BoardHalf from '../components/BoardHalf'
import GameStatus from '../components/GameStatus'
import StartGame from '../components/StartGame'
import DisplayName from '../components/DisplayName'
import PlayArea from '../components/PlayArea'
import CreationZone from '../components/CreationZone'
// import socket from '../helpers/websocket'
import io from 'socket.io-client'
import PassiveZone from '../components/PassiveZone'
import LeaderTechnique from '../components/LeaderTechnique'
import PlayerStatus from '../components/PlayerStatus'
import OptionSelections from '../components/OptionSelections'
import EndGame from '../components/EndGame'
import DeckSelection from '../components/DeckSelection'
import Legacy from '../components/Legacy'

class GameContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: localStorage.getItem('displayName') || 'Anonymous',
      deckID: localStorage.getItem('deckID') || 'Revolution',
      selectionsEnabled: false,
      inGame: false,
      targetSelection: null,
      selected: null,
      gameState: {
        validSelections: null,
        started: null,
        winner: null,
        myTurn: false,
        my: {
          stats: {
            money: 0,
            income: 0,
            growth: 0,
            debt: 0,
            rent: 0,
            fervour: 0,
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
      serverPlayers: [],
      turnTimer: 0,
      turnEnd: 0,
    }
    this.socket = this.initSocket()
    this.timerID = setInterval(
      () => this.tick(),
      100
    )
    this.moveRequest = {}
    this.actionTargets = null
    this.requiresConfirmation = null

    this.handleUpdateDisplayName = this.handleUpdateDisplayName.bind(this)
    this.handleUpdateDeck = this.handleUpdateDeck.bind(this)
    this.handleStartGame = this.handleStartGame.bind(this)
    this.handleEndGame = this.handleEndGame.bind(this)
    this.handleEndTurn = this.handleEndTurn.bind(this)
    this.handleSelection = this.handleSelection.bind(this)

  }

  initSocket() {
    const host = window.location.hostname
    const socket = io.connect('http://' + host + ':4000')

    socket.on('connect', (data) => {
      console.log('websocket connection established at ' + Date().toString())
      if (localStorage.getItem('displayName')) this.socket.emit('updateDisplayName', { displayName: localStorage.getItem('displayName') })
      if (localStorage.getItem('deckID')) this.socket.emit('updateDeckID', { deckID: localStorage.getItem('deckID') })
    })
    socket.on('displayNameAnnouncement', data => console.log(data.message))
    socket.on('disconnect', data => this.onDisconnect())
    socket.on('gameStateUpdate', report => this.updateGameState(report))
    socket.on('turnTimerUpdate', turnEnd => this.updateTurnEnd(turnEnd))
    socket.on('serverPlayersUpdate', serverPlayers => this.updateServerPlayers(serverPlayers))

    return socket
  }

  onDisconnect() {
    console.log('disconnected from websocket connection at ' + Date().toString())
    const newGameState = {...this.state.gameState}
    newGameState.winner = 'you disconnected'
    this.updateGameState({gameState: newGameState, eventsReport: []})
  }

  updateGameState(report) {
    // console.log('updatingGameState')
    this.resetMoveRequest()
    const newState = {
      gameState: report.gameState,
      selected: null,
      inGame: (report.gameState.started && !report.gameState.winner),
      selectionsEnabled: (report.gameState.started && !report.gameState.winner && report.gameState.myTurn),
    }
    this.setState(newState, this.updateTargetSelection)
    report.eventsReport.forEach(log => console.log(log))
  }

  updateTurnEnd(turnEnd) {
    // console.log('updatingTurnTimer')
    this.setState({ turnEnd })
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
      // console.log('starting game')
      this.socket.emit('requestTestGame', {
        opponentID
      })
    } else {
      console.log('start game button disabled')
    }
  }

  handleEndGame() {
    console.log(this.state.inGame)
    if (this.state.inGame) this.socket.emit('endGame')
  }

  handleEndTurn() {
    // console.log('ending turn')
    if (this.state.gameState.myTurn) this.socket.emit('endTurn')
  }

  initMoveRequest(selected) {
    this.moveRequest = {
      selected,
      attackTargets: JSON.parse(JSON.stringify(selected.attackTargets || null)),
      validSlots: JSON.parse(JSON.stringify(selected.validSlots || null)),
      options: JSON.parse(JSON.stringify(selected.options)),
      actions: JSON.parse(JSON.stringify(selected.actions))
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
    if (!this.moveRequest.selected) return this.state.gameState.validSelections
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
    const selected = []
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
    this.setState({ selectionsEnabled: false })
    const moveRequest = {
      selected: this.moveRequest.selected.objectID,
      attackTarget: this.moveRequest.attackTargets && this.moveRequest.attackTargets.chosenTarget.objectID,
      selectedSlot: this.moveRequest.validSlots && this.moveRequest.validSlots.chosenTarget.objectID,
      options: this.moveRequest.options && this.moveRequest.options.map(option => this.chosenOptionTargets(option)),
      actions: this.moveRequest.actions && this.moveRequest.actions.map(action => this.chosenActionTargets(action))
    }
    this.socket.emit('newMoveRequest', moveRequest)
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

  render() {
    const selections = {
      selectionsEnabled: this.state.selectionsEnabled,
      selected: this.state.selected,
      targetSelection: this.state.targetSelection,
      handleSelection: this.handleSelection,
    }

    return (
      // <div id='gameContainer' onContextMenu={event => { event.preventDefault(); event.stopPropagation() }}>
      <div id='gameContainer'>
        {/* <> */}
        <div className='topBar'>
          <DisplayName displayName={this.state.displayName} handleSubmit={this.handleUpdateDisplayName} />
          <DeckSelection deckID={this.state.deckID} updateDeck={this.handleUpdateDeck} />
          {
            this.state.inGame
              ? <EndGame endGame={this.handleEndGame} opponentName={this.state.gameState.opponent.name} />
              : <StartGame startGame={this.handleStartGame} opponents={this.state.serverPlayers} socketID={this.socket.id} />
          }
          <GameStatus winner={this.state.gameState.winner} started={this.state.gameState.started} mine={this.state.gameState.myTurn} turnEnd={this.state.turnTimer} endTurn={this.handleEndTurn} />
        </div>
        <PlayerHand mine={false} selections={selections} contents={this.state.gameState.opponent.hand} />
        {/* <OpponentHand cards={this.state.gameState.opponent.hand} /> */}
        <PlayArea selections={selections} requiresConfirmation={this.requiresConfirmation}>
          <div className='playerStatusDiv'>
            <PlayerStatus stats={this.state.gameState.opponent.stats} />
          </div>
          <div className='outerPlayArea opponent'>
            <PassiveZone mine={false} selections={selections} contents={this.state.gameState.opponent.passives} />
            <Leader mine={false} selections={selections} object={this.state.gameState.opponent.leader} />
            <LeaderTechnique mine={false} selections={selections} object={this.state.gameState.opponent.leaderTechnique} />
            <CreationZone mine={false} selections={selections} contents={this.state.gameState.opponent.creations} />
          </div>
          <div className="innerPlayArea">
            <Legacy mine={false} selections={selections} contents={this.state.gameState.opponent.legacy} />
            <BoardHalf mine={false} selections={selections} contents={this.state.gameState.opponent.board} />
            <Deck mine={false} selections={selections} contents={this.state.gameState.opponent.deck} />
          </div>
          <div className='anchor'>
            <OptionSelections mine={true} selections={selections} contents={this.nextOptionActionSelection()} />
          </div>
          <div className="innerPlayArea">
            <Legacy mine selections={selections} contents={this.state.gameState.my.legacy} />
            <BoardHalf mine selections={selections} contents={this.state.gameState.my.board} />
            <Deck mine selections={selections} contents={this.state.gameState.my.deck} />
          </div>
          <div className='outerPlayArea player'>
            <PassiveZone mine selections={selections} contents={this.state.gameState.my.passives} />
            <Leader mine selections={selections} object={this.state.gameState.my.leader} />
            <LeaderTechnique mine selections={selections} object={this.state.gameState.my.leaderTechnique} />
            <CreationZone mine selections={selections} contents={this.state.gameState.my.creations} />
          </div>
          <div className='playerStatusDiv'>
            <PlayerStatus stats={this.state.gameState.my.stats} />
          </div>
        </PlayArea>
        <PlayerHand mine selections={selections} contents={this.state.gameState.my.hand} />
        {/* </> */}
      </div>
    )
  }
}

export default GameContainer
