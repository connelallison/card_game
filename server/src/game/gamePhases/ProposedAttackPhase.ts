import EventPhase from "./EventPhase";
import Sequence from "./Sequence";
import AttackEvent from "../gameEvents/AttackEvent";
import Phases from "../dictionaries/Phases";

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