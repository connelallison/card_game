import EventPhase from "./EventPhase";

class ProposedAttackPhase extends EventPhase {
    parent: Sequence
    event: AttackEvent

    constructor(parent: Sequence, event: AttackEvent) {
        super(parent, event)
    }

    start(): void {
        this.emit('proposedAttack', this.event)
        this.queueSteps()
        if (!this.event.cancelled) {
            const attackPhase = new Phases.AttackPhase(this.parent, this.event)
            this.parent.queuedPhases.push(attackPhase)
        }
        this.end()
    }
}

export default ProposedAttackPhase

import Sequence from "./Sequence";
import Phases from "../dictionaries/Phases";
import { AttackEvent } from "./AttackPhase";