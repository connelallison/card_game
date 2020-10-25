import Phases from "../dictionaries/Phases";
import GamePlayer from "../gameObjects/GamePlayer";
import Game from "./Game";
import Sequence from "./Sequence";
import Turn from "./Turn";

class PreGameTurn extends Turn {
    player1ready: boolean
    player2ready: boolean

    constructor(parent: Game) {
        super(parent, null, 0)
        this.turnLength = 60000
        this.endPromise = this.endTurnPromise()
        this.player1ready = false
        this.player2ready = false
    }


    start() {
        this.turnEnd = Date.now() + this.turnLength
        this.game().announceNewTurn()
        this.game().mulliganReport()
        this.wait()
    }

    playerReady(player: GamePlayer) {
        const player1 = player === this.game().player1
        player1 ? this.player1ready = true : this.player2ready = true
        if (player.opponent().bot) {
            this.game().executeMulliganRequest([], player.opponent())
        } else if ((this.player1ready || this.game().player1.bot) && (this.player2ready || this.game().player2.bot) && !this.ended) {
            this.end()
        }
    }

    end(): void {
        this.ended = true
        if (!this.player1ready) this.game().executeMulliganRequest([], this.game().player1)
        if (!this.player2ready) this.game().executeMulliganRequest([], this.game().player2)
        this.game().endMulliganPhase()
        const startOfGameSequence = new Sequence(this)
        const startOfTurnPhase = new Phases.StartOfGamePhase(startOfGameSequence)
        startOfGameSequence.queuedPhases.push(startOfTurnPhase)
        this.startChild(startOfGameSequence)
        this.parent.activeChild = null
        // @ts-ignore
        this.endPromise.resolve()
    }
}

export default PreGameTurn

