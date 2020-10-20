import React, { Component } from 'react'
import './App.css'
import GameContainer from './containers/GameContainer'
import LobbyContainer from './containers/LobbyContainer'
import { Challenge } from './structs/Challenge'
import { Decks } from './structs/DeckObject'
import { LobbyPlayerData } from './structs/LobbyPlayerData'
import socket from './socket'
import Popup from './components/Popup'

interface AppState {
  displayName: string
  serverPlayers: LobbyPlayerData[]
  decks: Decks | null
  deckID: string | null
  status: 'lobby' | 'challenge' | 'game'
  online: boolean
  popup: PopupData | null
}

interface PopupData {
  header: string
  message: string
}

class App extends Component {
  state: AppState
  socket: SocketIOClient.Socket

  constructor(props) {
    super(props)
    this.state = {
      status: 'lobby',
      decks: null,
      deckID: localStorage.getItem('deckID') || 'random',
      displayName: localStorage.getItem('displayName') || 'Anonymous',
      serverPlayers: [],
      online: false,
      popup: null,
    }
    this.socket = this.initSocket(socket)
  }

  initSocket(socket: SocketIOClient.Socket) {
    console.log('app running initSocket')

    socket.on('connect', () => this.setState({ online: true }))
    socket.on('updateDecks', (decks: Decks) => this.updateDecks(decks))
    socket.on('challengeCancelled', canceller => this.challengeCancelled(canceller))
    socket.on('serverPlayersUpdate', serverPlayers => this.updateServerPlayers(serverPlayers))
    socket.on('gameEnded', winner => this.gameEnded(winner))
    socket.on('disconnect', data => this.onDisconnect())

    return socket
  }

  onDisconnect() {
    console.log('disconnected from websocket connection at ' + Date().toString())
    this.setState({ online: false, popup: { header: 'Disconnected', message: 'You have been disconnected from the server.' } })
  }

  gameEnded(winner: string) {
    this.setState({ popup: { header: 'Game ended', message: winner } })
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
    const status = unfilteredServerPlayers.find(player => player.socketID === this.socket.id)!.status
    this.setState({ serverPlayers, status })
  }

  updateDecks(decks: Decks) {
    const deckIDs = Object.values(decks).map(deck => deck.id)
    const deckID = deckIDs.includes(localStorage.getItem('deckID') as string) ? localStorage.getItem('deckID') as string : deckIDs[0]

    this.socket.emit('updateDeckID', { deckID })
    localStorage.setItem('deckID', deckID)
    this.setState({ deckID, decks })
  }

  challengeCancelled(canceller: { id: string, name: string }) {
    if (canceller.id !== this.socket.id) this.setState({ popup: { header: 'Challenge Cancelled', message: `${canceller.name} cancelled the challenge.` } })
  }

  dismissPopup() {
    this.setState({ popup: null })
  }

  render() {
    const gameOffscreen = this.state.status !== 'game'
    const lobbyOffscreen = this.state.status === 'game'
    const popup = this.state.popup ? <Popup header={this.state.popup.header} message={this.state.popup.message} dismiss={() => this.dismissPopup()} /> : null
    return (
      <>
        {popup}
        <GameContainer
          offscreen={gameOffscreen}
          updateDeck={deckID => this.handleUpdateDeck(deckID)}
          updateName={name => this.handleUpdateDisplayName(name)}
          deckID={this.state.deckID as string}
          decks={this.state.decks as Decks}
          displayName={this.state.displayName}
          serverPlayers={this.state.serverPlayers}
        />
        <LobbyContainer
          offscreen={lobbyOffscreen}
          updateDeck={deckID => this.handleUpdateDeck(deckID)}
          updateName={name => this.handleUpdateDisplayName(name)}
          deckID={this.state.deckID as string}
          decks={this.state.decks as Decks}
          displayName={this.state.displayName}
          serverPlayers={this.state.serverPlayers}
        />
      </>
    )

  }
}

export default App
