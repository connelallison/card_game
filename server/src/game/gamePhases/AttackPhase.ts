import GameEvent from "./GameEvent";
import EventPhase from "./EventPhase";

interface AttackEventObject {
    attacker: Character,
    defender: Character,
}

export class AttackEvent extends GameEvent {
    attacker: Character
    defender: Character
    cancelled: boolean = false

    constructor(game: Game, object: AttackEventObject) {
        super(game) 
        Object.assign(this, object)
    }

    generateLog() {
        this.log = `${this.attacker.name} attacks ${this.defender.name}.`
    }
}

class AttackPhase extends EventPhase {
    event: AttackEvent
    constructor(parent: Sequence | EventPhase, event: AttackEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        if (event.attacker.attack > 0) {
            event.generateLog()
            this.cacheEvent(event, 'attack')
            
            this.emit('beforeAttack', event)
            const attackerDamageEvent = new DamageEvent(this.game(), {
                objectSource: event.attacker,
                charSource: event.attacker,
                target: event.defender,
                damage: event.attacker.attack,
            })
            this.startChild(new Phases.DamageSinglePhase(this, attackerDamageEvent))
            let defenderDamageEvent
            if (event.defender.attack > 0) {
                defenderDamageEvent = new DamageEvent(this.game(), {
                    objectSource: event.defender,
                    charSource: event.defender,
                    target: event.attacker,
                    damage: event.defender.attack,
                })
                this.startChild(new Phases.DamageSinglePhase(this, defenderDamageEvent))
            }

            if (event.attacker.flags.pillage) {
                const healingEvent = new HealingEvent(this.game(), {
                    objectSource: attackerDamageEvent.objectSource,
                    charSource: attackerDamageEvent.charSource,
                    target: attackerDamageEvent.objectSource.controller().leaderZone[0],
                    healing: attackerDamageEvent.damage,
                })
                this.startChild(new Phases.HealSinglePhase(this, healingEvent))
            }
            if (event.defender.flags.pillage && event.defender.attack > 0) {
                const healingEvent = new HealingEvent(this.game(), {
                    objectSource: defenderDamageEvent.objectSource,
                    charSource: defenderDamageEvent.charSource,
                    target: defenderDamageEvent.objectSource.controller().leaderZone[0],
                    healing: defenderDamageEvent.damage,
                })
                this.startChild(new Phases.HealSinglePhase(this, healingEvent))
            }

            event.attacker.ready = false
            this.emit('afterAttack', event)
            this.queueSteps()
        }
        this.end()
    }
}

export default AttackPhase

import Sequence from "./Sequence";
import Phases from "../dictionaries/Phases";
import Character from "../gameObjects/Character";
import Game from "./Game";
import { DamageEvent } from "./DamageSinglePhase";
import { HealingEvent } from "./HealSinglePhase";