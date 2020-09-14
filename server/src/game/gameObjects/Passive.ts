import PersistentCard, { PersistentCardData } from "./PersistentCard";

export interface PassiveData extends PersistentCardData {
    type: 'Passive'
    subtype: PassiveSubtypeString
    ethos: boolean
}

abstract class Passive extends PersistentCard {
    static readonly data: PassiveData
    readonly data: PassiveData
    readonly ethos: boolean
    zone: PassiveZoneString
    type: 'Passive'
    inPlayZone: 'passiveZone'
    subtype: PassiveSubtypeString

    constructor(game: Game, owner: GamePlayer, data: PassiveData) {
        super(game, owner, data)
        this.inPlayZone = 'passiveZone'
        this.ethos = data.ethos
    }

    moveZone(destination: PassiveZoneString): void {
        this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
        this.owner[destination].push(this)
        this.zone = destination
        this.updateEnchantments()
    }
}

export default Passive

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { PassiveSubtypeString, PassiveZoneString } from "../stringTypes/ZoneTypeSubtypeString";