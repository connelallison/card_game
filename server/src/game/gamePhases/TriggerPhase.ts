import EventPhase from "./EventPhase";
import ActionEvent from "../gameEvents/ActionEvent";
import TechniqueCreation from "../gameObjects/TechniqueCreation";
import TriggerTypeString from "../stringTypes/TriggerTypeString";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import TriggerEvent from "../gameEvents/TriggerEvent";
import TriggerActionEvent from "../gameEvents/TriggerActionEvent";
import Phases from "../dictionaries/Phases";
import WonderCreation from "../gameObjects/WonderCreation";

class TriggerPhase extends EventPhase {
    parent: EventPhase
    event: TriggerEvent

    constructor(parent: EventPhase, event: TriggerEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        event.generateLog()
        this.cacheEvent(event, 'trigger')
        const triggerActionEvent = new TriggerActionEvent(this.game(), {
            controller: event.controller,
            objectSource: event.objectSource,
            targets: [],
            actions: event.actions,
            event: event.event,
        })
        this.startChild(new Phases.TriggerActionPhase(this, triggerActionEvent))
        if (!event.objectSource.repeatable) event.objectSource.owner.removeEnchantment(event.objectSource)
        if (event.objectSource.wonderTrigger && event.objectSource.owner instanceof WonderCreation) event.objectSource.owner.loseCharge()
        this.queueSteps()
        this.end()
    }
}

export default TriggerPhase