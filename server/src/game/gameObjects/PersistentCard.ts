import Card, { CardData } from "./Card";

export interface PersistentCardData extends CardData {
    type: PersistentCardTypeString
    subtype: PersistentCardSubtypeString,
}

abstract class PersistentCard extends Card {
    static readonly data: PersistentCardData
    readonly data: PersistentCardData
    inPlayZone: PlayZoneString
    type: PersistentCardTypeString
    subtype: PersistentCardSubtypeString
    
    constructor(game: Game, owner: GamePlayer, data: PersistentCardData) {
        super(game, owner, data)
    }

    inPlay(): boolean {
        return this.zone === this.inPlayZone
    }

    putIntoPlay(): void {
        this.moveZone(this.inPlayZone)
        this.game.inPlay.push(this)
    }

}

export default PersistentCard

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { PlayZoneString } from "../stringTypes/ZoneString";
import { PersistentCardTypeString } from "../stringTypes/ObjectTypeString";
import { PersistentCardSubtypeString } from "../stringTypes/ObjectSubtypeString";