import React, { Component } from 'react'
import Leader from '../components/Leader'
import OpponentHand from '../components/OpponentHand'
import PlayerHand from '../components/PlayerHand'
import Deck from '../components/Deck'
import BoardHalf from '../components/BoardHalf'
import GameStatus from '../components/GameStatus'
import TestGame from '../components/TestGame'
import DisplayName from '../components/DisplayName'
import PlayArea from '../components/PlayArea'
import CreationZone from '../components/CreationZone'
import socket from '../helpers/websocket'
import PassiveZone from '../components/PassiveZone'
import LeaderTechnique from '../components/LeaderTechnique'
import PlayerStatus from '../components/PlayerStatus'
import OptionSelections from '../components/OptionSelections'

class GameContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
            attack: 0,
            health: 0,
            armour: 0,
            currentMoney: 0,
            maxMoney: 0,
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
          hand: [],
          deck: 0
        },
        opponent: {
          stats: {
            money: 0,
            income: 0,
            growth: 0,
            debt: 0,
            rent: 0,
            fervour: 0,
          },
          leader: {
            attack: 0,
            health: 0,
            currentMoney: 0,
            maxMoney: 0,
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
          hand: [],
          deck: 0
        }
      },
      serverPlayers: [],
      turnTimer: 0,
      requestTestGameEnabled: true
    }
    this.timerID = setInterval(
      () => this.tick(),
      100
    )
    this.moveRequest = {}
    this.actionTargets = null
    this.requiresConfirmation = null

    this.handleRequestTestGame = this.handleRequestTestGame.bind(this)
    this.handleEndTurn = this.handleEndTurn.bind(this)
    this.handleSelection = this.handleSelection.bind(this)

    socket.on('gameStateUpdate', report => this.updateGameState(report))
    socket.on('turnTimerUpdate', turnTimer => this.updateTurnTimer(turnTimer))
    socket.on('serverPlayersUpdate', serverPlayers => this.updateServerPlayers(serverPlayers))
  }

  updateGameState(report) {
    this.resetMoveRequest()
    this.setState({ gameState: report.gameState, selected: null }, this.updateTargetSelection)
    report.eventsReport.forEach(log => console.log(log))
    if (this.state.gameState.started && !this.state.gameState.winner) {
      this.setState({ requestTestGameEnabled: false })
    } else {
      this.setState({ requestTestGameEnabled: true })
    }
  }

  updateTurnTimer(turnTimer) {
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

  handleRequestTestGame(opponentID) {
    if (this.state.requestTestGameEnabled) {
      console.log('requesting test game')
      socket.emit('requestTestGame', {
        opponentID
      })
    } else {
      console.log('test game button disabled')
    }
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
    console.log('checking move')
    if (this.moveRequest.selected && this.findNextTargetSelection() === null) this.announceMove()
  }

  findNextOptionActionTargetSelection() {

  }

  nextOption() {
    const slotChoiceRequired = this.moveRequest.validSlots && !this.moveRequest.validSlots.chosenTarget
    const nextOption = (
      !slotChoiceRequired 
      && this.moveRequest.options 
      && this.moveRequest.options.find(option => !option.chosenTarget|| option.actionTargets[option.chosenTarget.objectID].some(target => !target.chosenTarget))
      ) || null
    return nextOption
  }

  nextOptionActionSelection() {
    // const slotChoiceRequired = this.moveRequest.validSlots && !this.moveRequest.validSlots.chosenTarget
    // const nextOption = (!slotChoiceRequired && this.moveRequest.options && this.moveRequest.options.find(option => !option.chosenTarget || option.actionTargets[option.chosenTarget].some(target => !target.chosenTarget))) || null
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
    if (targetSelection !== this.state.targetSelection) this.setState({ targetSelection }, this.checkMoveRequest)
  }

  handleClearSelected() {
    this.resetMoveRequest()
    this.setState({
      selected: null,
    }, this.updateTargetSelection)
  }

  handleInvalidMove() {
    console.log("invalid move")
  }

  handleChooseSelected(selected) {
    this.initMoveRequest(selected)
    this.setState({
      selected,
    }, this.updateTargetSelection)
  }

  handleChooseTarget(target) {
    this.findNextTargetSelection().chosenTarget = target
    this.updateTargetSelection()
  }

  handleConfirmation() {
    this.requiresConfirmation = false
    this.updateTargetSelection()
  }

  handleSelection(selection) {
    if (selection === this.moveRequest.selected) return this.handleClearSelected()
    else if (selection === 'confirm') return this.handleConfirmation()
    else if (!this.state.targetSelection || !this.state.targetSelection.validTargets.includes(selection.objectID)) return this.handleInvalidMove()
    else if (!this.moveRequest.selected) return this.handleChooseSelected(selection)
    else return this.handleChooseTarget(selection)
  }

  announceMove() {
    console.log('announcing move')
    const moveRequest = {
      selected: this.moveRequest.selected.objectID,
      attackTarget: this.moveRequest.attackTargets && this.moveRequest.attackTargets.chosenTarget.objectID,
      selectedSlot: this.moveRequest.validSlots && this.moveRequest.validSlots.chosenTarget.objectID,
      options: this.moveRequest.options && this.moveRequest.options.map(option => this.chosenOptionTargets(option)),
      actions: this.moveRequest.actions && this.moveRequest.actions.map(action => this.chosenActionTargets(action))
    }
    console.log('about to emit')
    socket.emit('newMoveRequest', moveRequest)
  }

  handleEndTurn() {
    // console.log('ending turn')
    if (this.state.gameState.myTurn) socket.emit('endTurn')
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
    // console.log(currentName);

    return (
      <>
        <div className='topBar'>
          <DisplayName currentName={currentName} handleSubmit={this.handleUpdateDisplayName} />
          <TestGame onRequested={this.handleRequestTestGame} opponents={this.state.serverPlayers} socketID={socket.id} />
          <GameStatus winner={this.state.gameState.winner} started={this.state.gameState.started} mine={this.state.gameState.myTurn} turnEnd={this.state.turnTimer} endTurn={this.handleEndTurn} />
        </div>
        <PlayerStatus stats={this.state.gameState.opponent.stats} />
        <OpponentHand cards={this.state.gameState.opponent.hand} />
        <PlayArea targetSelection={this.state.targetSelection} requiresConfirmation={this.requiresConfirmation} handleSelection={this.handleSelection}>
          <Deck mine={false} cardNumber={this.state.gameState.opponent.deck} />
          <div className='leaderDiv'>
            <PassiveZone mine={false} passives={this.state.gameState.opponent.passives} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <Leader mine={false} object={this.state.gameState.opponent.leader} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <LeaderTechnique mine={false} object={this.state.gameState.opponent.leaderTechnique} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <CreationZone mine={false} creations={this.state.gameState.opponent.creations} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
          </div>
          <br />
          <BoardHalf mine={false} slots={this.state.gameState.opponent.board} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
          <div className='anchor'>
            <OptionSelections mine={true} contents={this.nextOptionActionSelection()} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
          </div>
          <BoardHalf mine slots={this.state.gameState.my.board} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
          <br />
          <div className='leaderDiv'>
            <PassiveZone mine passives={this.state.gameState.my.passives} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <Leader mine object={this.state.gameState.my.leader} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <LeaderTechnique mine object={this.state.gameState.my.leaderTechnique} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
            <CreationZone mine creations={this.state.gameState.my.creations} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
          </div>
          <Deck mine cardNumber={this.state.gameState.my.deck} />
        </PlayArea>
        <PlayerHand cards={this.state.gameState.my.hand} targetSelection={this.state.targetSelection} handleSelection={this.handleSelection} />
        <PlayerStatus stats={this.state.gameState.my.stats} />
      </>
    )
  }
}

export default GameContainer
