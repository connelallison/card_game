import Card, { CardData, CardStats } from "./Card";

export interface PersistentCardData extends CardData {
    type: PersistentCardTypeString
    subtype: PersistentCardSubtypeString
    stats?: {
        Debt?: number
        Rent?: number
        Fervour?: number
        Growth?: number
        Income?: number
    }
}

export interface PersistentCardStats extends CardStats {
    rent: number
    fervour: number
    growth: number
    income: number
}

abstract class PersistentCard extends Card {
    static readonly data: PersistentCardData
    readonly data: PersistentCardData
    inPlayZone: PlayZoneString
    type: PersistentCardTypeString
    subtype: PersistentCardSubtypeString
    stats: PersistentCardStats

    constructor(game: Game, owner: GamePlayer, data: PersistentCardData) {
        super(game, owner, data)
    }

    inPlay(): boolean {
        return this.zone === this.inPlayZone
    }

    putIntoPlay(index?: number): void {
        this.moveZone(this.inPlayZone, index)
    }

    baseStats(): PersistentCardStats {
        return {
            debt: 0,
            rent: 0,
            fervour: 0,
            growth: 0,
            income: 0,
        }
    }

    baseData(): GameObjectData {
        return {
            id: this.data.id,
            name: this.data.name,
            cost: this.rawCost,
            stats: this.baseStats(),
            flags: this.baseFlags(),
        }
    }

    // addBaseStatEffects(data: PersistentCardData): void {
    //     if (data.debt) this.addBaseEffect(new Effects.Debt(this.game, this, { statValue: data.debt }))
    //     if (data.rent) this.addBaseEffect(new Effects.Rent(this.game, this, { statValue: data.rent }))
    //     if (data.fervour) this.addBaseEffect(new Effects.Fervour(this.game, this, { statValue: data.fervour }))
    // }
}

export default PersistentCard

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { PersistentCardSubtypeString, PersistentCardTypeString, PlayZoneString } from "../stringTypes/ZoneTypeSubtypeString";
import GameObjectData from "../structs/GameObjectData";
import Effects from "../dictionaries/Effects";
import Tooltips from "../dictionaries/Tooltips";
import { LocalisationString, LocalisedNameAndText, NameAndTextObject } from "../structs/Localisation";
