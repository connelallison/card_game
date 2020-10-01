import React, { Component } from 'react'
import Leader from '../components/Leader'
import OpponentHand from '../components/OpponentHand'
import PlayerHand from '../components/PlayerHand'
import Deck from '../components/Deck'
import BoardHalf from '../components/BoardHalf'
import GameStatus from '../components/GameStatus'
import StartGame from '../components/StartGame'
import DisplayName from '../components/DisplayName'
import PlayArea from '../components/PlayArea'
import CreationZone from '../components/CreationZone'
import socket from '../helpers/websocket'
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
      deckID: localStorage.getItem('deckID') || 'KnightDeck',
      targetSelection: null,
      selected: null,
      inGame: false,
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
          },
          leaderTechnique: {
            text: '',
            name: '',
          },
          board: [],
          creations: [],
          passives: [],
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
          },
          leaderTechnique: {
            text: '',
            name: '',
          },
          board: [],
          creations: [],
          passives: [],
          legacy: [],
          hand: [],
          deck: [],
        }
      },
      serverPlayers: [],
      turnTimer: 0,
    }
    this.timerID = setInterval(
      () => this.tick(),
      100
    )
    this.moveRequest = {}
    this.actionTargets = null
    this.requiresConfirmation = null

    this.handleUpdateDeck = this.handleUpdateDeck.bind(this)
    this.handleStartGame = this.handleStartGame.bind(this)
    this.handleEndGame = this.handleEndGame.bind(this)
    this.handleEndTurn = this.handleEndTurn.bind(this)
    this.handleSelection = this.handleSelection.bind(this)

    socket.on('gameStateUpdate', report => this.updateGameState(report))
    socket.on('turnTimerUpdate', turnTimer => this.updateTurnTimer(turnTimer))
    socket.on('serverPlayersUpdate', serverPlayers => this.updateServerPlayers(serverPlayers))
  }

  updateGameState(report) {
    // console.log('updatingGameState')
    this.resetMoveRequest()
    this.setState({ gameState: report.gameState, selected: null }, this.updateTargetSelection)
    report.eventsReport.forEach(log => console.log(log))
    if (this.state.gameState.started && !this.state.gameState.winner) {
      this.setState({ inGame: true })
    } else {
      this.setState({ inGame: false })
    }
  }

  updateTurnTimer(turnTimer) {
    // console.log('updatingTurnTimer')
    this.setState({ turnTimer })
  }

  updateServerPlayers(unfilteredServerPlayers) {
    const serverPlayers = unfilteredServerPlayers.filter(player => player.socketID !== socket.id)
    this.setState({ serverPlayers })
  }

  handleUpdateDisplayName(displayName) {
    socket.emit('updateDisplayName', {
      displayName: displayName
    })
    localStorage.setItem('displayName', displayName)
  }

  handleUpdateDeck(deckID) {
    socket.emit('updateDeckID', {
      deckID,
    })
    localStorage.setItem('deckID', deckID)
    this.setState({ deckID })
  }

  handleStartGame(opponentID) {
    if (!this.state.inGame) {
      // console.log('starting game')
      socket.emit('requestTestGame', {
        opponentID
      })
    } else {
      console.log('start game button disabled')
    }
  }

  handleEndGame() {
    console.log(this.state.inGame)
    if (this.state.inGame) socket.emit('endGame')
  }

  handleEndTurn() {
    // console.log('ending turn')
    if (this.state.gameState.myTurn) socket.emit('endTurn')
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
    this.requiresConfirmation = (this.moveRequest.selected.zone === 'hand' && !this.moveRequest.attackTargets && !this.moveRequest.validSlots && !this.moveRequest.options && !this.moveRequest.actions)
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
    if (this.state.selected && this.state.selected.includes(selection)) return this.handleClearSelected(selection)
    else if (selection === 'confirm') return this.handleConfirmation()
    else if (!this.state.targetSelection || !this.state.targetSelection.validTargets.includes(selection.objectID)) return this.handleInvalidMove()
    else if (!this.moveRequest.selected) return this.handleChooseSelected(selection)
    else return this.handleChooseTarget(selection)
  }

  announceMove() {
    const moveRequest = {
      selected: this.moveRequest.selected.objectID,
      attackTarget: this.moveRequest.attackTargets && this.moveRequest.attackTargets.chosenTarget.objectID,
      selectedSlot: this.moveRequest.validSlots && this.moveRequest.validSlots.chosenTarget.objectID,
      options: this.moveRequest.options && this.moveRequest.options.map(option => this.chosenOptionTargets(option)),
      actions: this.moveRequest.actions && this.moveRequest.actions.map(action => this.chosenActionTargets(action))
    }
    socket.emit('newMoveRequest', moveRequest)
  }

  flatMappedOption(option) {
    option.actionTargets = []
    option.hostile = false
    option.validTargets = option.actions.map((action, index) => index)
    option.actions.forEach((action, index) => {
      action.objectID = index
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
      turnTimer: (this.state.turnTimer - 100)
    })
  }

  render() {
    let currentName
    if (localStorage.getItem('displayName')) {
      currentName = localStorage.getItem('displayName')
    } else {
      currentName = 'Anonymous'
    }

    return (
      <>
        <div className='topBar'>
          <DisplayName currentName={currentName} handleSubmit={this.handleUpdateDisplayName} />
          <DeckSelection deckID={this.state.deckID} updateDeck={this.handleUpdateDeck} />
          {
            this.state.inGame
              ? <EndGame endGame={this.handleEndGame} opponentName={this.state.gameState.opponent.name} />
              : <StartGame startGame={this.handleStartGame} opponents={this.state.serverPlayers} socketID={socket.id} />
          }
          <GameStatus winner={this.state.gameState.winner} started={this.state.gameState.started} mine={this.state.gameState.myTurn} turnEnd={this.state.turnTimer} endTurn={this.handleEndTurn} />
        </div>
        <PlayerStatus stats={this.state.gameState.opponent.stats} />
        <OpponentHand cards={this.state.gameState.opponent.hand} />
        <PlayArea targetSelection={this.state.targetSelection} requiresConfirmation={this.requiresConfirmation} handleSelection={this.handleSelection}>
          <div className='outerPlayArea'>
            <PassiveZone mine={false} selected={this.state.selected} contents={this.state.gameState.opponent.passives} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <Leader mine={false} selected={this.state.selected} object={this.state.gameState.opponent.leader} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <LeaderTechnique mine={false} selected={this.state.selected} object={this.state.gameState.opponent.leaderTechnique} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <CreationZone mine={false} selected={this.state.selected} contents={this.state.gameState.opponent.creations} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
          </div>
          <div className="innerPlayArea">
            <Legacy mine={false} selected={this.state.selected} contents={this.state.gameState.opponent.legacy} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <BoardHalf mine={false} selected={this.state.selected} contents={this.state.gameState.opponent.board} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <Deck mine={false} selected={this.state.selected} contents={this.state.gameState.opponent.deck} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
          </div>
          <div className='anchor'>
            <OptionSelections mine={true} selected={this.state.selected} contents={this.nextOptionActionSelection()} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
          </div>
          <div className="innerPlayArea">
            <Legacy mine selected={this.state.selected} contents={this.state.gameState.my.legacy} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <BoardHalf mine selected={this.state.selected} contents={this.state.gameState.my.board} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <Deck mine selected={this.state.selected} contents={this.state.gameState.my.deck} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
          </div>
          <div className='outerPlayArea'>
            <PassiveZone mine selected={this.state.selected} contents={this.state.gameState.my.passives} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <Leader mine selected={this.state.selected} object={this.state.gameState.my.leader} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <LeaderTechnique mine selected={this.state.selected} object={this.state.gameState.my.leaderTechnique} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <CreationZone mine selected={this.state.selected} contents={this.state.gameState.my.creations} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
          </div>
        </PlayArea>
        <PlayerHand mine contents={this.state.gameState.my.hand} selected={this.state.selected} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
        <PlayerStatus stats={this.state.gameState.my.stats} />
      </>
    )
  }
}

export default GameContainer
