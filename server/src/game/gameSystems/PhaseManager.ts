import Game from "../Game";
import Unit from "../gameObjects/Unit";
import Character from "../gameObjects/Character";
import Leader from "../gameObjects/Leader";
import DeathEvent from "../gameEvents/DeathEvent";
import DrawEvent from "../gameEvents/DrawEvent";
import AttackEventObject from "../gameEvents/AttackEventObject";
import AttackEvent from "../gameEvents/AttackEvent";
import DamageEventObject from "../gameEvents/DamageEventObject";
import DamageEvent from "../gameEvents/DamageEvent";
import StartOfTurnEvent from "../gameEvents/StartOfTurnEvent";
import EndOfTurnEvent from "../gameEvents/EndOfTurnEvent";
import PlayEventObject from "../gameEvents/PlayEventObject";
import PlayEvent from "../gameEvents/PlayEvent";
import Spell from "../gameObjects/Spell";
import DrawSequenceObject from "../gameEvents/DrawSequenceObject";
import DrawSequence from "../gameEvents/DrawSequence";

class PhaseManager {
    game: Game
    deathQueue: DeathEvent[]

    constructor(game: Game) {
        this.game = game;
        this.deathQueue = []
    }

    steps(): void {
        this.deathPhase()
    }

    startOfTurnPhase(): void {
        const event = new StartOfTurnEvent(this.game)
        this.game.event.emit('startOfTurn', event)
        this.deathPhase()
    }

    endOfTurnPhase(): void {
        const event = new EndOfTurnEvent(this.game)
        this.game.event.emit('endOfTurn', event)
        this.deathPhase()
    }

    deathPhase(): void {
        this.game.inPlay.slice(0).forEach((character: Character) => {
            if (character.health <= 0) {
                if (character instanceof Leader) {
                    console.log('leader is dead')
                    this.game.inPlay.splice(this.game.inPlay.indexOf(character), 1)
                    this.game.endGame()
                } else if (character instanceof Unit) {
                    console.log("unit is dying: ", character.name)
                    this.game.inPlay.splice(this.game.inPlay.indexOf(character), 1)
                    const deathEvent = new DeathEvent(this.game, {
                        object: character,
                        controller: character.controller(),
                    })
                    this.game.turn.cacheEvent(deathEvent, 'death')
                    this.deathQueue.push(deathEvent)
                    character.moveZone('graveyard')
                }
            }
        })
        if (!this.game.gameOver && this.deathQueue.length > 0) {
            this.game.event.emit('afterDeath', this.deathQueue.shift())
            this.deathPhase()
        } else {
            // this.game.announceGameState()
        }
    }

    proposedAttackPhase(eventObject: AttackEventObject): void {
        const event = new AttackEvent(this.game, eventObject)
        this.game.event.emit('proposedAttack', event)
        this.deathPhase()
        // console.log('attackEvent: ', event.attacker.objectID, event.defender.objectID, event.cancelled)
        if (!event.cancelled) this.attackPhase(event)
    }

    attackPhase(event: AttackEvent): void {
        this.game.event.emit('beforeAttack', event)
        this.damagePhase({
            objectSource: event.attacker,
            charSource: event.attacker,
            target: event.defender,
            value: event.attacker.attack,
        })
        this.damagePhase({
            objectSource: event.defender,
            charSource: event.defender,
            target: event.attacker,
            value: event.defender.attack,
        })
        this.game.turn.cacheEvent(event, 'attack')
        event.attacker.ready = false
        this.game.event.emit('afterAttack', event)
        this.deathPhase()
    }

    damagePhase(eventObject: DamageEventObject): void {
        const event = new DamageEvent(this.game, eventObject)
        // console.log('damageEvent: ', event.objectSource.objectID, event.charSource.objectID, event.target.objectID, event.value)
        this.game.event.emit('beforeDamage', event) 
        event.target.takeDamage(event.value)
        this.game.turn.cacheEvent(event, 'damage')
        this.game.event.emit('afterDamage', event)
    }

    playPhase(eventObject: PlayEventObject): void {
        const event = new PlayEvent(this.game, eventObject)
        if (event.card.type === 'unit') {
            this.playPhaseUnit(event)
        } else if (event.card.type === 'spell') {
            this.playPhaseSpell(event)
        }
        this.deathPhase()
    }

    playPhaseUnit(event: PlayEvent): void {
        const { player, target = null } = event
        const unit = event.card as Unit
        player.spendMana(unit.cost)
        unit.moveZone('board')
        this.game.inPlay.push(unit)
        this.game.turn.cacheEvent(event, 'play')
        this.game.event.emit('onPlay', event)
        this.game.event.emit('onSummon', event)
        this.game.event.emit('afterPlay', event)
        this.game.event.emit('afterSummon', event)
    }

    playPhaseSpell(event: PlayEvent): void {
        const { player, target = null } = event
        const spell = event.card as Spell
        player.spendMana(spell.cost)
        spell.moveZone('graveyard')
        this.game.turn.cacheEvent(event, 'play')
        this.game.event.emit('onPlay', event)
        this.spellPhase(event)
        this.game.event.emit('afterPlay', event)
    }

    spellPhase(event: PlayEvent): void {
        const { player, target = null } = event
        const spell = event.card as Spell
        this.game.event.emit('beforeSpell', event) 
        this.game.turn.cacheEvent(event, 'spell')
        spell.actions.forEach(action => {
            action(spell, target)
        })
        this.game.event.emit('afterSpell', event)
    }

    drawPhase(eventObject: DrawSequenceObject): void {
        const drawSequence = new DrawSequence(this.game, eventObject)
        this.game.event.emit('proposedDrawSequence', drawSequence)
        const { player, number, criteria } = drawSequence
        let drawQueue = player.deck
        criteria.forEach(criterion => drawQueue = drawQueue.filter(criterion))
        const afterDrawQueue: DrawEvent[] = []
        for (let i = 0; i < number; i++) {
            if (i < drawQueue.length) {
                if (player.hand.length < player.maxHand) {
                    // player draws normally
                    drawQueue[i].moveZone('hand')
                    const event = new DrawEvent(this.game, {
                        player: player,
                        card: drawQueue[i]
                    })
                    this.game.turn.cacheEvent(event, 'draw')
                    this.game.event.emit('onDraw', event)
                    afterDrawQueue.push(event)
                } else {
                    // hand is full
                    drawQueue[i].moveZone('graveyard')
                }
            } else {
                // attempts to draw, but can't
                player.fatigueCounter++
                this.damagePhase({
                    objectSource: player.leader[0],
                    charSource: player.leader[0],
                    target: player.leader[0],
                    value: player.fatigueCounter,
                })                
            }
        }
        afterDrawQueue.forEach(event => {
            this.game.event.emit('afterDraw', event)
        })
    }

}

export default PhaseManager