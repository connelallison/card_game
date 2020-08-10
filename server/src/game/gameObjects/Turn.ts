import Game from "../Game"
import GamePlayer from "./GamePlayer"
import EventCache from "../gameEvents/EventCache"
import GameEvent from "../gameEvents/GameEvent"

class Turn {
    game: Game
    activePlayer: GamePlayer
    nextActivePlayer: GamePlayer
    turnNumber: number
    turnLength: number
    eventCache: EventCache
    over: boolean

    constructor(game: Game, activePlayer: GamePlayer, turnNumber: number) {
        this.game = game
        this.activePlayer = activePlayer
        this.nextActivePlayer = activePlayer.opponent
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
        this.game.phases.startOfTurnPhase()
        await this.game.sleep(this.turnLength)
        if (!this.over) {
            this.end()
            return this.activePlayer.opponent
        } else {
            return null
        }
    }
    
    end(): void {
        this.over = true
        this.game.phases.endOfTurnPhase()
    }

    cacheEvent(event: GameEvent, type: string): void {
        this.game.eventCache[type].push(event)
        this.game.eventCache.all.push(event)
        this.eventCache[type].push(event)
        this.eventCache.all.push(event)
    }
}

export default Turn