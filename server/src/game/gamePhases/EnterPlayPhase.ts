import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface EnterPlayEventObject {
    controller: GamePlayer,
    card: PersistentCard,
    objectSource: GameObject,
    charSource: Character,
    slot?: BoardSlot,
    targetSlot?: BoardSlot,
    index?: number
}

export class EnterPlayEvent extends GameEvent {
    controller: GamePlayer
    card: PersistentCard
    objectSource: GameObject
    charSource: Character
    slot?: BoardSlot
    targetSlot?: BoardSlot
    index?: number

    constructor(game: Game, object: EnterPlayEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const slot = this.card instanceof Follower ? `in slot ${this.slot.index() + 1} ` : ''
        this.log =  `${this.card.name.english} enters play ${slot}under ${this.controller.playerName}'s control.`
    }
}
class EnterPlayPhase extends EventPhase {
    parent: EventPhase
    event: EnterPlayEvent

    constructor(parent: EventPhase, event: EnterPlayEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        this.resolveTargetSlot()
        this.putIntoPlay()
        event.generateLog()
        this.cacheEvent(event, 'enterPlay')
        this.startChild(new Phases.AuraUpdatePhase(this))
        this.emit('onEnterPlay', event)
        this.queueSteps()
        this.end()
    }

    resolveTargetSlot(): void {
        const event = this.event
        if (!event.slot && event.targetSlot) event.slot = event.targetSlot.nearestEmptySlot()
    }

    putIntoPlay(): void {
        const event = this.event
        if (event.card instanceof Follower) {
            const index = event.slot ? event.slot.index() : event.controller.firstEmptySlotIndex()
            if (!event.slot) event.slot = event.controller.board[index]
            event.card.summonSickness = true
            event.card.putIntoPlay(index)
        } else {
            event.card.putIntoPlay(event.index)
        }
    }
}

export default EnterPlayPhase

import Follower from "../gameObjects/Follower";
import Phases from "../dictionaries/Phases";
import GamePlayer from "../gameObjects/GamePlayer";
import PersistentCard from "../gameObjects/PersistentCard";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import BoardSlot from "../gameObjects/BoardSlot";
import Game from "./Game";