import EventPhase from "./EventPhase";
import ProposedDrawEvent from "../gameEvents/ProposedDrawEvent";
import DrawEvent from "../gameEvents/DrawEvent";
import DamageEvent from "../gameEvents/DamageEvent";
import Phases from "../dictionaries/Phases";

class ProposedDrawPhase extends EventPhase {
    parent: EventPhase
    event: ProposedDrawEvent
    afterDrawQueue: DrawEvent[]

    constructor(parent: EventPhase, event: ProposedDrawEvent) {
        super(parent, event)
        this.afterDrawQueue = []
    }

    start(): void {
        const event = this.event
        this.emit('proposedDrawEvent', event)
        const { player } = event
        const drawQueue = event.criteria.reduce((queue, criterion) => queue.filter(criterion), player.deck)
        for (let i = 0; i < event.number; i++) {
            if (i < drawQueue.length) {
                if (player.hand.length < player.max.hand) {
                    // player draws normally
                    const card = drawQueue[i]
                    card.moveZone('hand')
                    const event = new DrawEvent(this.game(), {
                        player,
                        card,
                    })
                    event.generateLog()
                    this.cacheEvent(event, 'draw')
                    this.emit('onDraw', event)
                    this.afterDrawQueue.push(event)
                } else {
                    // hand is full
                    drawQueue[i].moveZone('graveyard')
                    // this.fatigueDamage()
                }
            } else {
                // attempts to draw, but can't
                this.fatigueDamage()
            }
        }
        this.afterDrawQueue.forEach(event => {
            this.emit('afterDraw', event)
        })
        this.queueSteps()
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

export default ProposedDrawPhase