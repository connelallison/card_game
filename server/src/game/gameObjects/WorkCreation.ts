import Creation, { CreationData } from "./Creation";

export interface WorkCreationData extends CreationData {
    subtype: 'Work'
}

abstract class WorkCreation extends Creation {
    static readonly data: WorkCreationData
    readonly data: WorkCreationData
    subtype: 'Work'

    constructor(game: Game, owner: GamePlayer, data: WorkCreationData) {
        super(game, owner, data)

        this.game.event.on('afterStartOfTurn', (event) => this.afterStartOfTurn(event))
    }

    afterStartOfTurn(event: StartOfTurnEvent) {
        if (this.inPlay() && this.controller().myTurn()) {
            this.loseCharge()
        }
    }
}

export default WorkCreation

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { StartOfTurnEvent } from "../gamePhases/StartOfTurnPhase";