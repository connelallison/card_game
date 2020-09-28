import PersistentCard, { PersistentCardData } from "./PersistentCard";

export interface LeaderTechniqueData extends PersistentCardData {
    type: 'LeaderTechnique'
    subtype: LeaderTechniqueSubtypeString
    collectable: false
    repeatable: boolean
}

abstract class LeaderTechnique extends PersistentCard {
    static readonly data: LeaderTechniqueData
    readonly data: LeaderTechniqueData
    collectable: false
    inPlayZone: 'leaderTechniqueZone'
    ready: boolean
    repeatable: boolean
    type: 'LeaderTechnique'
    subtype: LeaderTechniqueSubtypeString
    zone: LeaderTechniqueZoneString

    constructor(game: Game, owner: GamePlayer, data: LeaderTechniqueData) {
        super(game, owner, data)
        this.repeatable = data.repeatable
        this.ready = true
        this.inPlayZone = 'leaderTechniqueZone'

        this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
    }

    startOfTurn(event) {
        if (this.inPlay() && this.controller().myTurn()) this.ready = true
    }

    provideReport(localisation: LocalisationString = 'english'): ObjectReport {
        this.updateActiveOptions()
        this.updateActiveActions()
        this.updateActiveEvents()

        return {
            name: this.name[localisation],
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            type: this.type,
            subtype: this.subtype,
            zone: this.zone,
            ownerName: this.owner.playerName,
            playerID: this.owner.objectID,
            canBeSelected: this.canBeSelected(),
            staticText: this.staticText[localisation],
            text: this.generateDynamicText(this.text, localisation),
            options: this.optionsReport(localisation),
            actions: this.actionsReport(localisation),
        }
    }

    moveZone(destination: LeaderTechniqueZoneString, index?: number): void {
        if (this.zone === 'leaderTechniqueZone') this.game.inPlay.splice(this.game.inPlay.indexOf(this), 1)
        this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)

        if (destination === 'leaderTechniqueZone') {
            if (this.owner.leaderTechniqueZone[0]) this.owner.leaderTechniqueZone[0].moveZone('graveyard')
            this.game.inPlay.push(this)
        }

        if (typeof index === 'number') this.owner[destination].splice(index, 0, this)
        else this.owner[destination].push(this)
        this.zone = destination
        this.updateEnchantments()
    }

    canBeSelected(): boolean {
        return this.inPlay() && this.canBeUsed()
    }

    canBeUsed(): boolean {
        // if (this.id === 'OrkusTheOrkestSmash') {
        //     console.log('ready', this.name.english, this.ready)
        //     console.log('canUse', this.name.english, this.controller().canUse(this))
        // }
        return this.ready && this.controller().canUse(this)
    }

    actionsActive(): boolean {
        return this.controller().myTurn() && this.zone === 'leaderTechniqueZone'
    }
}

export default LeaderTechnique

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { LeaderTechniqueSubtypeString, LeaderTechniqueZoneString } from "../stringTypes/ZoneTypeSubtypeString";
import { ObjectReport } from "../structs/ObjectReport";
import { LocalisationString } from "../structs/Localisation";
