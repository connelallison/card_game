import React, { Component } from 'react'
import './App.css'
import GameContainer from './containers/GameContainer'
import LobbyContainer from './containers/LobbyContainer'
import { Challenge } from './structs/Challenge'
import { CardObject, Cards, Decks } from './structs/DeckObject'
import { LobbyPlayerData } from './structs/LobbyPlayerData'
import socket from './socket'
import Popup from './components/Popup'
import DeckViewContainer from './containers/DeckViewContainer'
import NavBar from './components/NavBar'

interface AppState {
  displayName: string
  serverPlayers: LobbyPlayerData[]
  decks: Decks | null
  cards: Cards | null
  deckID: string | null
  status: 'lobby' | 'challenge' | 'game'
  view: 'lobby' | 'decks' | 'howTo' | 'game'
  online: boolean
  popup: PopupData
  gameTransition: boolean
  gameEnded: boolean
}

interface PopupData {
  header: string
  message: string[]
}

class App extends Component {
  state: AppState
  socket: SocketIOClient.Socket
  previousStatus: 'lobby' | 'challenge' | 'game'

  constructor(props) {
    super(props)
    this.state = {
      status: 'lobby',
      decks: null,
      cards: null,
      deckID: localStorage.getItem('deckID') || 'random',
      displayName: localStorage.getItem('displayName') || 'Anonymous',
      serverPlayers: [],
      online: false,
      view: 'lobby',
      gameTransition: false,
      gameEnded: false,
      popup: {
        header: 'Welcome to the History of Everything!',
        message: [],
      },
    }
    this.socket = this.initSocket(socket)
    this.previousStatus = 'lobby'
  }

  initSocket(socket: SocketIOClient.Socket) {
    // console.log('app running initSocket')

    socket.on('connect', () => this.setState({ online: true }))
    socket.on('updateDecks', (decks: Decks) => this.updateDecks(decks))
    socket.on('updateCards', (cards: Cards) => this.updateCards(cards))
    socket.on('challengeCancelled', canceller => this.challengeCancelled(canceller))
    socket.on('serverPlayersUpdate', serverPlayers => this.updateServerPlayers(serverPlayers))
    socket.on('gameEnded', winner => this.gameEnded(winner))
    socket.on('disconnect', data => this.onDisconnect())

    return socket
  }

  onDisconnect() {
    console.log('disconnected from websocket connection at ' + Date().toString())
    this.setState({ online: false, popup: { header: 'Disconnected', message: ['You have been disconnected from the server.'] } })
  }

  gameEnded(winner: string) {
    setTimeout(() => this.setState({ popup: { header: 'Game ended', message: [winner] } }), 750)
    this.setState({ gameEnded: true })
  }

  handleUpdateDeck(deckID: string) {
    this.socket.emit('updateDeckID', {
      deckID,
    })
    localStorage.setItem('deckID', deckID)
    this.setState({ deckID })
  }

  handleUpdateDisplayName(displayName: string) {
    this.socket.emit('updateDisplayName', { displayName })
    localStorage.setItem('displayName', displayName)
    this.setState({ displayName })
  }

  updateServerPlayers(unfilteredServerPlayers: LobbyPlayerData[]) {
    const serverPlayers = unfilteredServerPlayers.filter(player => player.socketID !== this.socket.id)
    const previousStatus = this.previousStatus
    const status = unfilteredServerPlayers.find(player => player.socketID === this.socket.id)!.status
    this.previousStatus = status
    if ((previousStatus === 'lobby' || previousStatus === 'challenge') && status === 'game') {
      this.gameTransitionTimeout()
      setTimeout(() => this.setState({ view: 'game' }), 750)
      this.setState({ serverPlayers, status, gameTransition: true }, () => this.dismissPopup())
    } else {
      this.setState({ serverPlayers, status })
    }
  }

  updateDecks(decks: Decks) {
    const deckIDs = Object.values(decks).map(deck => deck.id)
    const deckID = deckIDs.includes(localStorage.getItem('deckID') as string) ? localStorage.getItem('deckID') as string : deckIDs[0]

    this.socket.emit('updateDeckID', { deckID })
    localStorage.setItem('deckID', deckID)
    this.setState({ deckID, decks })
  }

  updateCards(cards: Cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
    this.setState({ cards })
  }

  challengeCancelled(canceller: { id: string, name: string }) {
    if (canceller.id !== this.socket.id) this.setState({ popup: { header: 'Challenge Cancelled', message: [`${canceller.name} cancelled the challenge.`] } })
  }

  gameTransitionTimeout() {
    setTimeout(() => this.setState({ gameTransition: false }), 1500)
  }

  dismissPopup() {
    if (this.state.popup && this.state.popup.header === 'Welcome to the History of Everything!') document.documentElement.requestFullscreen()
    if (this.state.popup && this.state.popup.header === 'Game ended') {
      setTimeout(() => this.setState({ view: 'lobby', gameEnded: false }), 750)
      this.gameTransitionTimeout()
      this.setState({ popup: null, gameTransition: true })
    } else {
      this.setState({ popup: null })
    }
  }

  render() {
    const gameTransitionOverlay = this.state.gameTransition ? <div className='gameTransition overlay' /> : null
    const gameEndedOverlay = this.state.gameEnded ? <div className='gameEnded overlay' /> : null
    const popup = (this.state.status === 'lobby' && this.state.popup) ? <Popup header={this.state.popup.header} message={this.state.popup.message} dismiss={() => this.dismissPopup()} /> : null
    return (
      <>
        {gameTransitionOverlay}
        {gameEndedOverlay}
        {popup}
        <NavBar
          offscreen={this.state.view === 'game'}
          view={this.state.view}
          displayName={this.state.displayName}
          updateName={name => this.handleUpdateDisplayName(name)}
          updateView={view => this.setState({ view })}
        />
        <GameContainer
          offscreen={this.state.view !== 'game'}
          displayName={this.state.displayName}
          updateName={name => this.handleUpdateDisplayName(name)}
          updateDeck={deckID => this.handleUpdateDeck(deckID)}
          deckID={this.state.deckID as string}
          decks={this.state.decks as Decks}
          serverPlayers={this.state.serverPlayers}
        />
        <LobbyContainer
          offscreen={this.state.view !== 'lobby'}
          updateDeck={deckID => this.handleUpdateDeck(deckID)}
          updateName={name => this.handleUpdateDisplayName(name)}
          deckID={this.state.deckID as string}
          decks={this.state.decks as Decks}
          displayName={this.state.displayName}
          serverPlayers={this.state.serverPlayers}
        />
        <DeckViewContainer
          offscreen={this.state.view !== 'decks'}
          displayName={this.state.displayName}
          updateName={name => this.handleUpdateDisplayName(name)}
          updateDeck={deckID => this.handleUpdateDeck(deckID)}
          deckID={this.state.deckID as string}
          decks={this.state.decks as Decks}
          cards={this.state.cards as Cards}
        />
      </>
    )

  }
}

export default App
