import GamePhase from "./GamePhase"

class Turn extends GamePhase {
    parent: Game
    children: Sequence[]
    activeChild: Sequence
    queuedPhases: Sequence[]
    activePlayer: GamePlayer
    nextActivePlayer: GamePlayer
    turnNumber: number
    turnLength: number
    turnEnd: number
    endPromise: Promise<unknown>

    constructor(parent: Game, activePlayer: GamePlayer, turnNumber: number) {
        super()
        this.parent = parent
        this.activePlayer = activePlayer
        this.nextActivePlayer = activePlayer?.opponentPlayer
        this.turnNumber = turnNumber
        this.turnLength = 60000
        this.endPromise = this.endTurnPromise()
    }

    endTurnPromise() {
        let res
        const promise = new Promise((resolve) => {
            res = resolve
        })
        // @ts-ignore
        promise.resolve = res;
        return promise;
    }
    
    start() {
        this.turnEnd = Date.now() + this.turnLength
        this.wait()
        this.startChild(this.startOfTurnSequence())
    }

    async wait() {
        await this.sleep(this.turnLength)
        if (!this.ended) {
            this.end()
        }
    }

    flagEnded(): void {
        this.ended = true
    }

    end(): void {
        if (!this.parent.ended) {
            if (!this.activeChild) {
                this.startChild(this.endOfTurnSequence())
            } 
            if (this.parent.queuedPhases.length === 0) {
                const nextTurn = this.nextTurn()
                this.parent.queuedPhases.push(nextTurn)
            }
        }
        this.ended = true
        this.parent.activeChild = null
        // @ts-ignore
        this.endPromise.resolve()
    }

    startOfTurnSequence(): Sequence {
        const startOfTurnEvent = new StartOfTurnEvent(this.game())
        const startOfTurnSequence = new Sequence(this)
        const startOfTurnPhase = new Phases.StartOfTurnPhase(startOfTurnSequence, startOfTurnEvent)
        startOfTurnSequence.queuedPhases.push(startOfTurnPhase)
        return startOfTurnSequence
    }

    endOfTurnSequence(): Sequence {
        const endOfTurnEvent = new EndOfTurnEvent(this.game())
        const endOfTurnSequence = new Sequence(this)
        const endOfTurnPhase = new Phases.EndOfTurnPhase(endOfTurnSequence, endOfTurnEvent)
        endOfTurnSequence.queuedPhases.push(endOfTurnPhase)
        return endOfTurnSequence
    }

    nextTurn(): Turn {
        return new Turn(this.game(), this.activePlayer.opponentPlayer, this.turnNumber + 1)
    }
}

export default Turn

import Game from "./Game"
import GamePlayer from "../gameObjects/GamePlayer"
import Sequence from "./Sequence"
import Phases from "../dictionaries/Phases"
import { StartOfTurnEvent } from "./StartOfTurnPhase"
import { EndOfTurnEvent } from "./EndOfTurnPhase"