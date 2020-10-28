import React, { Component } from 'react'
// import io from 'socket.io-client'
import ChallengeIncoming from '../components/ChallengeIncoming'
import ChallengePreparation from '../components/ChallengePreparation'
import ChallengeSent from '../components/ChallengeSent'
import DeckSelection from '../components/DeckSelection'
import DisplayName from '../components/DisplayName'
import LobbyChat from '../components/LobbyChat'
import LobbyPlayerList from '../components/LobbyPlayerList'
import { AcceptedChallenge, Challenge, IncomingChallenge } from '../structs/Challenge'
import { ChatMessageData } from '../structs/ChatMessageData'
import { DeckObject, Decks } from '../structs/DeckObject'
import { LobbyPlayerData } from '../structs/LobbyPlayerData'
import socket from '../socket'

interface LobbyState {
    challenge?: Challenge
    messages: ChatMessageData[]
    firstConnection: boolean
}

interface LobbyProps {
    offscreen?: boolean
    decks: Decks
    displayName: string
    serverPlayers: LobbyPlayerData[]
    deckID: string
    updateDeck: (deckID: string) => void
    updateName: (name: string) => void
}

class LobbyContainer extends Component {
    props!: LobbyProps
    socket: SocketIOClient.Socket
    state: LobbyState

    constructor(props: LobbyProps) {
        super(props)
        this.state = {
            messages: [this.testBotMessage([
                `Welcome to the History of Everything! I'm TestBot.`,
                `If there's no one else online, or you just want to practice against a simple AI, I'm always available for a game. You can challenge me like any other player.`,
            ])],
            firstConnection: true
        }
        this.socket = this.initSocket(socket)
    }

    initSocket(socket: SocketIOClient.Socket): SocketIOClient.Socket {
        // console.log('lobby running initSocket')

        socket.on('connect', () => {
            !this.state.firstConnection && this.testBotAnnouncement('You have reconnected to the server.')
            this.setState({ firstConnection: false })
        })
        socket.on('testBotAnnouncement', data => this.testBotAnnouncement(data.message))
        socket.on('disconnect', data => this.onDisconnect())
        socket.on('newChatMessage', message => this.addChatMessage(message))
        socket.on('incomingChallenge', challenge => this.incomingChallenge(challenge))
        socket.on('challengeCancelled', cancellerName => this.challengeCancelled())
        socket.on('challengeAccepted', () => this.challengeAccepted())
        socket.on('gameStarting', () => this.gameStarting())

        return socket
    }

    onDisconnect() {
        // console.log('disconnected from websocket connection at ' + Date().toString())
        this.setState({
            challenge: null,
        }, () => this.addChatMessage(this.testBotMessage(['You have been disconnected from the server.'])))
    }

    testBotMessage(lines: string[]): ChatMessageData {
        return {
            senderName: 'TestBot',
            senderID: 'TestBot',
            nameNum: '',
            lines: lines.map(line => ({ line, time: Date.now() })),
        }
    }

    testBotAnnouncement(message: string) {
        this.addChatMessage(this.testBotMessage([message]))
    }

    addChatMessage(message: ChatMessageData) {
        let messages: ChatMessageData[]
        if (this.state.messages.length > 0 && this.state.messages[this.state.messages.length - 1].senderID === message.senderID) {
            messages = [...this.state.messages]
            messages[this.state.messages.length - 1].lines.push(...message.lines)
        } else {
            messages = [...this.state.messages, message]
            if (this.state.messages.length > 100) messages.shift()
        }
        this.setState({ messages })
    }

    sendMessage(message: string) {
        // console.log(message)
        this.socket.emit('sendChatMessage', { message })
    }

    sendChallenge(opponentID: string) {
        // if (opponentID !== 'TestBot') {
        //     this.socket.emit('pvpChallenge', { opponentID })
        // } else {
        //     this.socket.emit('testBotChallenge')
        // }
        this.socket.emit('pvpChallenge', { opponentID })
    }

    acceptChallenge() {
        this.socket.emit('acceptChallenge')
    }

    cancelChallenge() {
        this.socket.emit('cancelChallenge')
    }

    readyChallenge() {
        this.socket.emit('readyChallenge')
    }

    notReadyChallenge() {
        this.socket.emit('notReadyChallenge')
    }

    incomingChallenge(challenge: IncomingChallenge) {
        // console.log(challenge)
        this.setState({ challenge })
    }

    sentChallenge(challenge: IncomingChallenge) {

    }

    challengeCancelled() {
        this.setState({ challenge: null })
    }

    challengeAccepted() {
        const challenge = { ...this.state.challenge } as Challenge
        challenge.accepted = true
        this.setState({ challenge })
    }

    gameStarting() {
        this.setState({ challenge: null })
    }

    render() {
        const challenge = this.state.challenge
            ? !this.state.challenge.accepted
                ? this.state.challenge.incoming
                    ? <ChallengeIncoming
                        challenge={this.state.challenge}
                        acceptChallenge={() => this.acceptChallenge()}
                        cancelChallenge={() => this.cancelChallenge()}
                    />
                    : <ChallengeSent
                        challenge={this.state.challenge}
                        cancelChallenge={() => this.cancelChallenge()}
                    />
                : <ChallengePreparation
                    challenge={this.state.challenge}
                    deckID={this.props.deckID as string}
                    decks={this.props.decks as Decks}
                    readyChallenge={() => this.readyChallenge()}
                    notReadyChallenge={() => this.notReadyChallenge()}
                    cancelChallenge={() => this.cancelChallenge()}
                    updateDeck={this.props.updateDeck}
                />
            : null

        return (
            <>
                {/* <div className='topBar'>
                    <DisplayName displayName={this.props.displayName} handleSubmit={this.props.updateName} />
                    <DeckSelection deckID={this.props.deckID as string} decks={this.props.decks as Decks} updateDeck={this.props.updateDeck} />
                </div> */}
                <div id='lobbyContainer' className={this.props.offscreen ? 'offscreen' : ''}>
                    <LobbyPlayerList sendChallenge={opponentID => this.sendChallenge(opponentID)} players={this.props.serverPlayers} />
                    <LobbyChat socketID={this.socket.id} sendMessage={message => this.sendMessage(message)} messages={this.state.messages} />
                    {challenge}
                </div>
            </>
        )
    }
}

export default LobbyContainer