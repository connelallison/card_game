import EventPhase from "./EventPhase";
import SpendMoneyEvent from "../gameEvents/SpendMoneyEvent";
import DamageEvent from "../gameEvents/DamageEvent";
import Phases from "../dictionaries/Phases";

class SpendMoneyPhase extends EventPhase {
    parent: EventPhase
    event: SpendMoneyEvent

    constructor(parent: EventPhase, event: SpendMoneyEvent) {
        super(parent, event)
    }

    start(): void {
        const event = this.event
        if (event.money > 0) {
            this.emit('beforeSpendMoney', event)
            event.player.spendMoney(event.money)
            event.generateLog()
            this.cacheEvent(event, 'spendMoney')
            this.emit('afterSpendMoney', event)
            if (event.player.money < 0) {
                this.fatigueDamage()
            }
            this.queueSteps()
        }
        this.end()
    }

    fatigueDamage(): void {
        const player = this.event.player
        player.fatigueCounter++
        const damageEvent = new DamageEvent(this.game(), {
            objectSource: player.leaderZone[0],
            charSource: player.leaderZone[0],
            target: player.leaderZone[0],
            damage: player.fatigueCounter,
        })
        this.startChild(new Phases.DamageSinglePhase(this, damageEvent))
    }
}

export default SpendMoneyPhase