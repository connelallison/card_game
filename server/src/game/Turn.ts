import Game from "./Game"
import GamePlayer from "./GamePlayer"

class Turn {
    game: Game
    activePlayer: GamePlayer
    turnNumber: number
    turnLength: number
    eventCache: any
    over: boolean

    constructor(game: Game, activePlayer: GamePlayer, turnNumber: number) {
        this.game = game
        this.activePlayer = activePlayer
        this.turnNumber = turnNumber
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

export default Turn