class PhaseManager {
    constructor(game) {
        this.game = game;
        this.deathQueue = []
    }

    steps() {
        this.deathCreationStep()

    }

    deathCreationStep() {
        this.game.inPlay.slice(0).forEach((character) => {
            if (character.stats.health <= 0) {
                if (character.type === 'hero') {
                    console.log('hero is dead')
                    this.game.inPlay.splice(this.game.inPlay.indexOf(character), 1)
                    this.game.endGame()
                } else if (character.type === 'minion') {
                    console.log("minion is dying")
                    this.game.inPlay.splice(this.game.inPlay.indexOf(character), 1)
                    character.owner.graveyard.push(character.owner.board.splice(character.owner.board.indexOf(character), 1)[0])
                    character.zone = 'graveyard'
                    character.updateEnchantments()
                    this.game.deathEvents.push({
                        object: character,
                        owner: character.owner,
                    })
                    this.deathQueue.push({
                        object: character,
                        owner: character.owner,
                    })
                }
            }
        })
        if (!this.game.gameOver && this.deathQueue.length > 0) {
            this.deathPhase(this.deathQueue.shift())
        } else {
            // this.game.announceGameState()
        }
    }

    proposedAttackPhase(event) {
        this.game.event.emit('proposedAttack', event)
        this.deathCreationStep()
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
        event.attacker.ready = false
        this.game.event.emit('afterAttack', event)
        this.deathCreationStep()
    }

    damagePhase(event) {
        this.game.event.emit('beforeDamage', event) 
        console.log(event)
        event.target.takeDamage(event.value)
        this.game.event.emit('afterDamage', event)
    }

    deathPhase(event) {
        this.game.event.emit('afterDeath', event)
        this.deathCreationStep()
    }

    playPhase(event) {
        if (event.card.type === 'minion') {
            this.playPhaseMinion(event)
        } else if (event.card.type === 'spell') {
            this.playPhaseSpell(event)
        }
    }

    playPhaseMinion(event) {
        const { player, card } = event
        player.spendMana(card.cost)
        card.moveZone('board')
        this.game.inPlay.push(card)
        this.game.event.emit('onPlay', event)
        this.game.event.emit('onSummon', event)
        card.onPlay()
        this.game.event.emit('afterPlay', event)
        this.game.event.emit('afterSummon', event)
        this.deathCreationStep()
    }

    playPhaseSpell(event) {
        const { player, card } = event
        player.spendMana(card.cost)
        card.moveZone('graveyard')
        this.game.event.emit('onPlay', event)
        this.spellPhase(event)
        this.game.event.emit('afterPlay', event)
        this.deathCreationStep()
    }

    spellPhase(event) {
        this.game.event.emit('beforeSpell', event) 
        event.card.onPlay()
        this.game.event.emit('afterSpell', event)
    }

    // summonPhase(event) {
    //     this.game.event.emit('')
    // }

    drawPhase(event) {
        const drawEvent = event
        this.game.event.emit('proposedDraw', drawEvent)
        const { player, number = 1, criteria = () => true } = drawEvent
        const drawQueue = player.deck.filter(criteria)
        const afterDrawQueue = []
        for (let i = 0; i < number; i++) {
            if (i < drawQueue.length) {
                drawQueue[i].moveZone('hand')
                this.game.event.emit('onDraw', {
                    player: player,
                    card: drawQueue[i]
                })
                afterDrawQueue.push(drawQueue[i])
            } else {
                player.fatigueCounter++
                this.damagePhase({
                    source: player,
                    target: player.hero,
                    value: player.fatigueCounter,
                })                
            }
        }
        afterDrawQueue.forEach(card => {
            this.game.event.emit('afterDraw', { player, card })
        })
    }

}

module.exports = PhaseManager