abstract class GameEvent {
    turn: Turn
    log: string
    reports: { [index in LocalisationString]: any }

    constructor(public game: Game) {
        this.game = game
        this.turn = this.game.activeChild
        this.reports = {
            english: null,
        }
    }

    abstract generateLog(): void
    abstract generateReport(localisation: LocalisationString): void
}

export default GameEvent

import { LocalisationString } from "../structs/Localisation"
import Game from "./Game";
import Turn from "./Turn";