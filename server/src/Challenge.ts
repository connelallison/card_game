import serverEvent from './ServerEvent'
import DeckObject from './game/structs/DeckObject'
import ServerPlayer from "./ServerPlayer"
import Game from './game/gamePhases/Game'
import Decks from './game/dictionaries/Decks'

class PvPChallenge {
    player1: ServerPlayer
    player2: ServerPlayer
    accepted: boolean
    cancelled: boolean
    started: boolean
    player1ready: boolean
    player2ready: boolean
    player1deck: DeckObject
    player2deck: DeckObject
    expiry: number

    constructor(player1: ServerPlayer, player2: ServerPlayer) {
        this.player1 = player1
        this.player2 = player2
        this.accepted = false
        this.cancelled = false
        this.started = false
        this.player1ready = false
        this.player2ready = false
        this.player1deck = null
        this.player2deck = null
        serverEvent.removeAllListeners(`cancelChallenge:${player1.socketID}`)
        serverEvent.removeAllListeners(`cancelChallenge:${player2.socketID}`)
        serverEvent.removeAllListeners(`acceptChallenge:${player2.socketID}`)
        serverEvent.on(`playerDisconnected:${player1.socketID}`, () => {
            this.cancel(player1.socketID)
        })
        serverEvent.on(`playerDisconnected:${player2.socketID}`, () => {
            this.cancel(player2.socketID)
        })
        serverEvent.on(`cancelChallenge:${player1.socketID}`, () => {
            this.cancel(player1.socketID)
        })
        serverEvent.on(`cancelChallenge:${player2.socketID}`, () => {
            this.cancel(player2.socketID)
        })
        serverEvent.on(`acceptChallenge:${player2.socketID}`, () => {
            this.accept()
        })
        this.expiry = Date.now() + (30 * 1000)

        this.wait()
    }

    // start() {

    //     // this.startChild(this.startOfTurnSequence())
    // }

    async wait() {
        await this.sleep(30 * 1000)
        if (!this.cancelled && !this.accepted) {
            this.cancel(this.player2.socketID)
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    cancel(cancellerID) {
        if (!this.started) {
            this.cancelled = true
            serverEvent.emit(`challengeCancelled:${this.player1.socketID}`, cancellerID)
            serverEvent.removeAllListeners(`challengeCancelled:${this.player1.socketID}`)
        }
    }

    accept() {
        this.accepted = true
        serverEvent.emit(`challengeAccepted:${this.player1.socketID}`)
        serverEvent.emit(`challengeAccepted:${this.player2.socketID}`)
        serverEvent.removeAllListeners(`challengeAccepted:${this.player1.socketID}`)
        serverEvent.removeAllListeners(`challengeAccepted:${this.player2.socketID}`)
        serverEvent.removeAllListeners(`readyChallenge:${this.player1.socketID}`)
        serverEvent.removeAllListeners(`readyChallenge:${this.player2.socketID}`)
        serverEvent.removeAllListeners(`notReadyChallenge:${this.player1.socketID}`)
        serverEvent.removeAllListeners(`notReadyChallenge:${this.player2.socketID}`)
        serverEvent.on(`readyChallenge:${this.player1.socketID}`, (deck: DeckObject) => this.ready(this.player1, deck))
        serverEvent.on(`readyChallenge:${this.player2.socketID}`, (deck: DeckObject) => this.ready(this.player2, deck))
        serverEvent.on(`notReadyChallenge:${this.player1.socketID}`, () => this.notReady(this.player1))
        serverEvent.on(`notReadyChallenge:${this.player2.socketID}`, () => this.notReady(this.player2))
    }

    ready(player: ServerPlayer, deck: DeckObject) {
        if (player === this.player1) {
            this.player1ready = true
            this.player1deck = deck
        }
        if (player === this.player2) {
            this.player2ready = true
            this.player2deck = deck
        }
        if (this.player1ready && this.player2ready) this.start()
    }

    notReady(player: ServerPlayer) {
        if (player === this.player1) {
            this.player1ready = false
            this.player1deck = null
        }
        if (player === this.player2) {
            this.player2ready = false
            this.player2deck = null
        }
    }


    start() {
        console.log('both ready - starting')
        this.player1.status = 'game'
        this.player2.status = 'game'
        serverEvent.emit(`gameStarting:${this.player1.socketID}`)
        serverEvent.emit(`gameStarting:${this.player2.socketID}`)
        // const pvpGame = new Game(this.player1.displayName, this.player2.displayName, Decks[this.player1.deckID], Decks[this.player2.deckID], this.player1.socketID, this.player2.socketID)
        // pvpGame.init()
    }
}

export default PvPChallenge