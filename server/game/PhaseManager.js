class PhaseManager {
    constructor(game) {
        this.game = game;
        this.deathQueue = []
    }

    steps() {
        this.deathPhase()
    }

    startOfTurnPhase(event) {
        this.game.event.emit('startOfTurn', event)
        this.deathPhase()
    }

    endOfTurnPhase(event) {
        this.game.event.emit('endOfTurn', event)
        this.deathPhase()
    }

    deathPhase() {
        this.game.inPlay.slice(0).forEach((character) => {
            if (character.stats.health <= 0) {
                if (character.type === 'hero') {
                    console.log('hero is dead')
                    this.game.inPlay.splice(this.game.inPlay.indexOf(character), 1)
                    this.game.endGame()
                } else if (character.type === 'minion') {
                    console.log("minion is dying: ", character.name)
                    this.game.inPlay.splice(this.game.inPlay.indexOf(character), 1)
                    character.owner.graveyard.push(character.owner.board.splice(character.owner.board.indexOf(character), 1)[0])
                    character.zone = 'graveyard'
                    character.updateEnchantments()
                    const deathEvent = {
                        object: character,
                        owner: character.owner,
                    }
                    this.game.turn.cacheEvent(deathEvent, 'death')
                    this.deathQueue.push(deathEvent)
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

    proposedAttackPhase(event) {
        this.game.event.emit('proposedAttack', event)
        this.deathPhase()
        if (!event.cancelled) this.attackPhase(event)
    }

    attackPhase(event) {
        this.game.event.emit('beforeAttack', event)
        this.damagePhase({
            source: event.attacker,
            target: event.defender,
            value: event.attacker.stats.attack,
        })
        this.damagePhase({
            source: event.defender,
            target: event.attacker,
            value: event.defender.stats.attack,
        })
        this.game.turn.cacheEvent(event, 'attack')
        event.attacker.ready = false
        this.game.event.emit('afterAttack', event)
        this.deathPhase()
    }

    damagePhase(event) {
        this.game.event.emit('beforeDamage', event) 
        // console.log(event.target)
        event.target.takeDamage(event.value)
        this.game.turn.cacheEvent(event, 'damage')
        this.game.event.emit('afterDamage', event)
    }

    playPhase(event) {
        if (event.card.type === 'minion') {
            this.playPhaseMinion(event)
        } else if (event.card.type === 'spell') {
            this.playPhaseSpell(event)
        }
        this.deathPhase()
    }

    playPhaseMinion(event) {
        const { player, card, target = null } = event
        player.spendMana(card.cost)
        card.moveZone('board')
        this.game.inPlay.push(card)
        this.game.turn.cacheEvent(event, 'play')
        this.game.event.emit('onPlay', event)
        this.game.event.emit('onSummon', event)
        // card.onPlay()
        this.game.event.emit('afterPlay', event)
        this.game.event.emit('afterSummon', event)
        // this.deathPhase()
    }

    playPhaseSpell(event) {
        console.log('beginning playPhaseSpell')
        const { player, card, target = null } = event
        player.spendMana(card.cost)
        card.moveZone('graveyard')
        this.game.turn.cacheEvent(event, 'play')
        this.game.event.emit('onPlay', event)
        this.spellPhase(event)
        this.game.event.emit('afterPlay', event)
        // this.deathPhase()
    }

    spellPhase(event) {
        console.log('beginning spellPhase')
        const { player, card, target = null } = event
        // console.log(target)
        this.game.event.emit('beforeSpell', event) 
        this.game.turn.cacheEvent(event, 'spell')
        console.log(card.effects)
        card.effects.forEach(effect => {
            console.log(effect.toString())
            effect(player, card, target)
        })
        // event.card.onPlay()
        this.game.event.emit('afterSpell', event)
    }

    // summonPhase(event) {
    //     this.game.event.emit('')
    // }

    drawPhase(event) {
        const drawEvent = event
        this.game.event.emit('proposedDraw', drawEvent)
        const { player, number = 1, criteria = [] } = drawEvent
        let drawQueue = player.deck
        criteria.forEach(criterion => drawQueue = drawQueue.filter(criterion))
        const afterDrawQueue = []
        for (let i = 0; i < number; i++) {
            if (i < drawQueue.length) {
                if (player.hand.length < player.maxHand) {
                    // player draws normal
                    drawQueue[i].moveZone('hand')
                    const event = {
                        player: player,
                        card: drawQueue[i]
                    }
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
                    source: player,
                    target: player.hero,
                    value: player.fatigueCounter,
                })                
            }
        }
        afterDrawQueue.forEach(event => {
            this.game.event.emit('afterDraw', event)
        })
    }

}

module.exports = PhaseManager