import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";
import TargetRequirement from "../functionTypes/TargetRequirement";
import CreationSubtypeString from "../stringTypes/CreationSubtypeString";
import CreationZoneString from "../stringTypes/CreationZoneString";
import ObjectReport from "../structs/ObjectReport";
import DestroyableCard from "./DestroyableCard";

abstract class Creation extends DestroyableCard {
    zone: CreationZoneString
    inPlayZone: 'creations'
    type: 'creation'
    subtype: CreationSubtypeString
    health: number

    constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, subtype: CreationSubtypeString, rawCost: number, rawHealth: number, staticCardText: string = '', actions: Action[] = [], playRequirements: PlayRequirement[], targeted: boolean = false, targetDomain: any, targetRequirements: TargetRequirement[]) {
        super(game, owner, zone, id, name, 'creation', subtype, rawCost, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
        this.health = this.rawHealth
        this.inPlayZone = 'creations'
    }

    provideReport(): ObjectReport {
        this.updateStats()
        this.updateFlags()
        this.updateValidTargets()

        return {
            name: this.name,
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
            health: this.health,
            type: this.type,
            subtype: this.subtype,
            zone: this.zone,
            ownerName: this.owner.name,
            playerID: this.owner.playerID,
            canBeSelected: this.canBePlayed(),
            requiresTarget: this.targeted,
            validTargets: this.validTargetIDs(),
            staticCardText: this.staticCardText,
        }
    }

    inPlay(): boolean {
        return this.zone === 'creations'
    }

    loseCharge() {
        this.rawHealth--
        this.updateStats()
    }

    moveZone(destination: CreationZoneString): void {
        this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
        this.owner[destination].push(this)
        this.zone = destination
        this.updateEnchantments()
    }

    baseStats() {
        return { health: this.rawHealth }
    }

    setStats(stats) {
        this.health = stats.health
    }
}

export default Creation