import Turn from "./Turn";
import EventPhase from "./EventPhase";
import DeathEvent from "../gameEvents/DeathEvent";
import GamePhase from "./GamePhase";

class Sequence extends GamePhase {
    parent: Turn
    children: EventPhase[]
    activeChild: EventPhase
    queuedPhases: EventPhase[]
    deathQueue: DeathEvent[]
    eventLogQueue: string[]

    constructor(parent: Turn) {
        super() 
        this.parent = parent
        this.queuedPhases = []
        this.deathQueue = []
    }

    start(): void {
        while (!this.game().ended && this.queuedPhases.length > 0) {
            this.startChild(this.queuedPhases.shift())
        }
        this.end()
    }

    end(): void {
        this.ended = true
        this.parent.activeChild = null
    }
}

export default Sequence