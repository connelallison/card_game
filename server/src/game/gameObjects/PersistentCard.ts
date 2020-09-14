import Card, { CardData } from "./Card";

export interface PersistentCardData extends CardData {
    type: PersistentCardTypeString
    subtype: PersistentCardSubtypeString
    rent?: number
    fervour?: number
    growth?: number
    income?: number
}

abstract class PersistentCard extends Card {
    static readonly data: PersistentCardData
    readonly data: PersistentCardData
    inPlayZone: PlayZoneString
    type: PersistentCardTypeString
    subtype: PersistentCardSubtypeString
    rent: number
    fervour: number
    growth: number
    income: number

    constructor(game: Game, owner: GamePlayer, data: PersistentCardData) {
        super(game, owner, data)
        this.rent = 0
        this.fervour = 0
        this.growth = 0
        this.income = 0
    }

    inPlay(): boolean {
        return this.zone === this.inPlayZone
    }

    putIntoPlay(index?: number): void {
        this.moveZone(this.inPlayZone, index)
    }

    baseData(): GameObjectData {
        return {
            id: this.originalID,
            name: this.originalName,
            cost: this.rawCost,
            debt: 0,
            rent: 0,
            fervour: 0,
            growth: 0,
            income: 0,
            flags: this.baseFlags(),
        }
    }

    addBaseStatEnchantments(data: PersistentCardData): void {
        if (data.debt) this.addEnchantment(new Enchantments.Debt(this.game, this, { statValue: data.debt }))
        if (data.rent) this.addEnchantment(new Enchantments.Rent(this.game, this, { statValue: data.rent }))
        if (data.fervour) this.addEnchantment(new Enchantments.Fervour(this.game, this, { statValue: data.fervour }))
    }
}

export default PersistentCard

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { PersistentCardSubtypeString, PersistentCardTypeString, PlayZoneString } from "../stringTypes/ZoneTypeSubtypeString";
import GameObjectData from "../structs/GameObjectData";
import Enchantments from "../dictionaries/Enchantments";