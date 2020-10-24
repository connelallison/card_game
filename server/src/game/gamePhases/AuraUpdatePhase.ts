import { LocalisationString } from "../structs/Localisation";
import EventPhase from "./EventPhase";
import GameEvent from "./GameEvent";

export class UpdateEvent extends GameEvent {
    generateReport(localisation: LocalisationString = 'english') {
        this.reports[localisation] = {
            player1: {
                eventType: 'update',
                gameState: this.game.prepareGameState(this.game.player1)
            },
            player2: {
                eventType: 'update',
                gameState: this.game.prepareGameState(this.game.player2)
            },
        }
    }

    generateLog() { }
}

class AuraUpdatePhase extends EventPhase {
    constructor(parent: Sequence | EventPhase) {
        super(parent)
    }

    start(): void {
        // console.log('auraUpdatePhase')
        this.emit('auraReset')
        this.emit('staticApply')
        this.emit('auraEmit0')
        this.emit('auraApply0')
        this.emit('calculateGlobals')
        this.emit('auraEmit1')
        this.emit('auraApply1')
        this.emit('auraEmit2')
        this.emit('auraApply2')
        this.emit('applyPassionate')
        this.emit('applyInherited')
        this.emit('auraEmit3')
        this.emit('auraApply3')
        this.emit('finishUpdate')
        this.cacheEvent(new UpdateEvent(this.game()), 'update')

        this.emit('afterAuraUpdate')
        if (this.game().player1.leaderZone.length === 0 || this.game().player2.leaderZone.length === 0) this.game().end()
        this.end()
    }
}

export default AuraUpdatePhase

import Sequence from "./Sequence";