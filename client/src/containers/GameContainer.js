import React, { Component } from 'react'
import Leader from '../components/Leader.js'
import OpponentHand from '../components/OpponentHand.js'
import PlayerHand from '../components/PlayerHand.js'
import Deck from '../components/Deck.js'
import BoardHalf from '../components/BoardHalf.js'
import GameStatus from '../components/GameStatus.js'
import TestGame from '../components/TestGame.js'
import DisplayName from '../components/DisplayName.js'
import PlayArea from '../components/PlayArea.js'
import CreationZone from '../components/CreationZone.js'
import socket from '../helpers/websocket.js'
import PassiveZone from '../components/PassiveZone.js'
import LeaderAbility from '../components/LeaderAbility.js'

class GameContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      gameState: {
        started: null,
        winner: null,
        myTurn: false,
        my: {
          leader: {
            attack: 0,
            health: 0,
            currentMana: 0,
            maxMana: 0,
            canBeSelected: false,
            name: '',
          },
          leaderAbility: {
            staticCardText: '',
            name: '',
          },
          board: [],
          creations: [],
          passives: [],
          hand: [],
          deck: 0
        },
        opponent: {
          leader: {
            attack: 0,
            health: 0,
            currentMana: 0,
            maxMana: 0,
            canBeSelected: false,
            name: '',
          },
          leaderAbility: {
            staticCardText: '',
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
    const gameContainer = this

    this.handleRequestTestGame = this.handleRequestTestGame.bind(this)
    this.handleEndTurn = this.handleEndTurn.bind(this)
    this.handleClearSelected = this.handleClearSelected.bind(this)
    this.handleChooseSelected = this.handleChooseSelected.bind(this)
    this.handleChooseTarget = this.handleChooseTarget.bind(this)
    this.handleChooseSelectedNoTarget = this.handleChooseSelectedNoTarget.bind(this)
    this.handleInvalidMove = this.handleInvalidMove.bind(this)
    this.interactivityHandlers = {
      clearSelected: gameContainer.handleClearSelected,
      chooseSelected: gameContainer.handleChooseSelected,
      chooseTarget: gameContainer.handleChooseTarget,
      chooseSelectedNoTarget: gameContainer.handleChooseSelectedNoTarget,
      invalidMove: gameContainer.handleInvalidMove,
    }


    socket.on('gameStateUpdate', function (gameState) {
      // console.log(gameState);
      // console.log(gameContainer);
      gameContainer.setState({ gameState: gameState, selected: null })
      if (gameContainer.state.gameState.started && !gameContainer.state.gameState.winner) {
        gameContainer.setState({ requestTestGameEnabled: false })
      } else {
        gameContainer.setState({ requestTestGameEnabled: true })
      }
    })
    socket.on('turnTimerUpdate', function (turnTimer) {
      gameContainer.setState({ turnTimer: turnTimer })
    })
    socket.on('serverPlayersUpdate', function (serverPlayers) {
      const filteredServerPlayers = serverPlayers.filter(player => player.socketID !== socket.id)
      // console.log(filteredServerPlayers)
      gameContainer.setState({ serverPlayers: filteredServerPlayers })
    })
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

  handleClearSelected() {
    console.log("selected cleared")
    this.setState({
      selected: null
    })
  }

  handleChooseSelected(object) {
    console.log("selected chosen")
    console.log('selected: ', object)
    this.setState({
      selected: object
    })
  }

  handleChooseTarget(target = null) {
    console.log("target chosen")
    // console.log(`${JSON.stringify(this.state.selected)} targets ${JSON.stringify(target)}`)
    this.announceMove(this.state.selected, target)
    this.setState({
      selected: null
    })
  }

  handleChooseSelectedNoTarget(object) {
    console.log('selected chosen (no target required)')
    this.announceMove(object, null)
    this.setState({
      selected: null
    })
  }

  handleEndTurn() {
    console.log('ending turn')
    if (this.state.gameState.myTurn) socket.emit('endTurn')
  }

  handleInvalidMove() {
    console.log("invalid move")
  }

  announceMove(selected, target) {
    console.log('move request:')
    console.log('selected: ', selected)
    console.log('target: ', target)
    socket.emit("newMoveRequest", {
      selected: {
        objectID: selected.objectID,
        zone: selected.zone,
        playerID: selected.playerID
      },
      target: target && {
        objectID: target.objectID,
        zone: target.zone,
        playerID: target.playerID
      }
    })
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
          {/* {gameStatus}
          {turnTimer} */}
        </div>
        <br />
        <OpponentHand cards={this.state.gameState.opponent.hand} />
        {/* <br /> */}
        <PlayArea selected={this.state.selected} interactivity={this.interactivityHandlers}>
          <Deck mine={false} cardNumber={this.state.gameState.opponent.deck} />
          {/* <br /> */}
          <div className='leaderDiv'>
            <PassiveZone mine={false} passives={this.state.gameState.opponent.passives} selected={this.state.selected} interactivity={this.interactivityHandlers} />
            <Leader mine={false} object={this.state.gameState.opponent.leader} selected={this.state.selected} interactivity={this.interactivityHandlers} />
            <LeaderAbility mine={false} object={this.state.gameState.opponent.leaderAbility} selected={this.state.selected} interactivity={this.interactivityHandlers} />
            <CreationZone mine={false} creations={this.state.gameState.opponent.creations} selected={this.state.selected} interactivity={this.interactivityHandlers} />
          </div>
          <br />
          <BoardHalf mine={false} units={this.state.gameState.opponent.board} selected={this.state.selected} interactivity={this.interactivityHandlers} />
          <br />
          <BoardHalf mine units={this.state.gameState.my.board} selected={this.state.selected} interactivity={this.interactivityHandlers} />
          <br />
          <div className='leaderDiv'>
            <PassiveZone mine passives={this.state.gameState.my.passives} selected={this.state.selected} interactivity={this.interactivityHandlers} />
            <Leader mine object={this.state.gameState.my.leader} selected={this.state.selected} interactivity={this.interactivityHandlers} />
            <LeaderAbility mine object={this.state.gameState.my.leaderAbility} selected={this.state.selected} interactivity={this.interactivityHandlers} />
            <CreationZone mine creations={this.state.gameState.my.creations} selected={this.state.selected} interactivity={this.interactivityHandlers} />
          </div>
          <Deck mine cardNumber={this.state.gameState.my.deck} />
          {/* <br /> */}
        </PlayArea>
        <PlayerHand cards={this.state.gameState.my.hand} selected={this.state.selected} interactivity={this.interactivityHandlers} />
        <br />
        {/* <GameStatus winner={this.state.gameState.winner} started={this.state.gameState.started} mine={this.state.gameState.myTurn} turnEnd={this.state.turnTimer} /> */}
      </>
    )
  }
}

export default GameContainer
