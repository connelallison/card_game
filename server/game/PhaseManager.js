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
        // event.attacker.makeAttack(event.defender)
        // console.log(event.attacker)
        this.damagePhase({
            source: event.attacker,
            target: event.defender,
        })
        this.damagePhase({
            source: event.defender,
            target: event.attacker,
        })
        event.attacker.ready = false
        this.game.event.emit('afterAttack', event)
        this.deathCreationStep()
    }

    damagePhase(event) {
        this.game.event.emit('beforeDamage', event) 
        // console.log(event.source)
        event.target.takeDamage(event.source.stats.attack)
        // event.target.up
        this.game.event.emit('afterDamage', event)
    }

    deathPhase(event) {
        this.game.event.emit('afterDeath', event)
        this.deathCreationStep()
    }

    playPhase(event) {
        const { player, card } = event
        player.spendMana(card.cost)
        // event.player.played.push(event.card)
        if (card.type === 'minion') {
            player.board.push(player.hand.splice(player.hand.indexOf(card), 1)[0])
            card.zone = 'board'
            card.updateEnchantments()
            this.game.inPlay.push(card)
            // player.summoned.push(card)
        } else if (card.type === 'spell') {
            player.graveyard.push(player.hand.splice(player.hand.indexOf(card), 1)[0])
            card.zone = 'graveyard'
            card.updateEnchantments()
            // this.played.push(card)
        }
        this.game.event.emit('midPlay', event)
        if (card.type === 'spell') {
            this.game.event.emit('beforeSpell', event) 
        }
        card.onPlay()
        if (card.type === 'spell') {
            this.game.event.emit('afterSpell', event)
        }
        this.game.event.emit('afterPlay', event)
    }

}

module.exports = PhaseManager