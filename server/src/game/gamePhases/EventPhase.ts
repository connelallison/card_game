import GamePhase from "./GamePhase";
import GameEvent from "../gameEvents/GameEvent";
import Sequence from "./Sequence";
import Phases from "../dictionaries/Phases";

abstract class EventPhase extends GamePhase {
    parent: Sequence | EventPhase
    children: EventPhase[]
    activeChild: EventPhase
    event: GameEvent | GameEvent[]

    constructor(parent: Sequence | EventPhase, event?: GameEvent | GameEvent[]) {
        super()
        this.parent = parent
        this.event = event
    }

    end(): void {
        this.ended = true
        this.parent.activeChild = null
    }

    queueSteps(): void {
        if (this.parent instanceof Sequence) {
            const auraUpdatePhase = new Phases.AuraUpdatePhase(this.parent)
            const deathPhase = new Phases.DeathPhase(this.parent)
            this.parent.queuedPhases.push(auraUpdatePhase)
            this.parent.queuedPhases.push(deathPhase)
        }
    }

    // queueAuraUpdate(): void {
    //     if (this.parent instanceof Sequence) {
    //         const auraUpdatePhase = new AuraUpdatePhase(this.parent)
    //         this.parent.queuedPhases.push(auraUpdatePhase)
    //     }
    // }

    deepestChild(): EventPhase {
        return this.activeChild ? this.activeChild.deepestChild() : this
    }
}

export default EventPhase