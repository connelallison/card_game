class Turn {
    constructor(game, params) {
        this.game = game
        this.activePlayer = params.activePlayer
        this.turnNumber = params.turnNumber
        this.turnLength = 10000 
        this.eventCache = { 
            all: [],
            death: [],
            play: [],
            spell: [],
            attack: [],
            damage: [],
            draw: [],
        }
        this.over = false  
    }

    async start() {
        this.game.phases.startOfTurnPhase({activePlayer: this.activePlayer})
        await this.game.sleep(this.turnLength)
        if (!this.over) {
            this.end()
            return this.activePlayer.opponent
        } else {
            return null
        }
    }
    
    end() {
        this.over = true
        this.game.phases.endOfTurnPhase({activePlayer: this.activePlayer})
    }

    cacheEvent(event, type) {
        this.game.eventCache[type].push(event)
        this.eventCache[type].push(event)
        this.eventCache.all.push(event)
    }
}

module.exports = Turn