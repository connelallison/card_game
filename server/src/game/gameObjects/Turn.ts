import Game from "../gameSystems/Game"
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
        this.turnLength = 25000
        this.eventCache = {
            all: [],
            death: [],
            play: [],
            action: [],
            attack: [],
            damage: [],
            healing: [],
            draw: [],
            enterPlay: [],
        }
        this.over = false
    }

    start() {
        this.game.phases.startOfTurnPhase()
    }

    async sleep() {
        await this.game.sleep(this.turnLength)
        if (!this.over) {
            return this.end()
        } else {
            return null
        }
    }

    end(): GamePlayer {
        this.over = true
        this.game.phases.endOfTurnPhase()
        return this.activePlayer.opponent
    }

    cacheEvent(event: GameEvent, type: string): void {
        this.game.eventCache[type].push(event)
        this.game.eventCache.all.push(event)
        this.eventCache[type].push(event)
        this.eventCache.all.push(event)
    }
}

export default Turn