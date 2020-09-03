import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface SummonEventObject {
    controller: GamePlayer,
    cardID: CardIDString,
    objectSource: GameObject,
    charSource: Character,
    slot?: BoardSlot,
}

export class SummonEvent extends GameEvent {
    controller: GamePlayer
    cardID: CardIDString 
    objectSource: GameObject
    charSource: Character
    slot?: BoardSlot

    constructor(game: Game, object: SummonEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        const source = this.charSource === this.objectSource ? '' : `'s ${this.objectSource.name}`
        const controller = this.charSource === this.controller.leaderZone[0] ? '' : ` under ${this.controller.name}'s control` 
        this.log =  `${this.charSource.name}${source} summons a ${this.cardID}${controller}.`
    }
}

class SummonPhase extends EventPhase {
    parent: EventPhase
    event: SummonEvent

    constructor(parent: EventPhase, event: SummonEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        const { controller, objectSource, charSource, cardID } = event
        const card = this.createCard(cardID, controller) as PersistentCard
        controller.setAsideZone.push(card)
        if (controller.canSummon(card)) {
            event.generateLog()
            this.cacheEvent(event, 'summon')
            const enterPlayEvent = new EnterPlayEvent(this.game(), {
                controller,
                card,
                objectSource,
                charSource,
            })
            this.startChild(new Phases.EnterPlayPhase(this, enterPlayEvent))
            this.queueSteps()
        }
        this.end()
    }
}

export default SummonPhase

import Phases from "../dictionaries/Phases";
import PersistentCard from "../gameObjects/PersistentCard";
import GamePlayer from "../gameObjects/GamePlayer";
import { CardIDString } from "../stringTypes/DictionaryKeyString";
import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";
import BoardSlot from "../gameObjects/BoardSlot";
import Game from "./Game";
import { EnterPlayEvent } from "./EnterPlayPhase";