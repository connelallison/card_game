import Creation from "./Creation";
import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";
import TargetRequirement from "../functionTypes/TargetRequirement";
import ObjectReport from "../structs/ObjectReport";

class WeaponCreation extends Creation {
    subtype: 'weapon'
    rawAttack: number
    attack: number

    constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, rawCost: number, rawAttack: number, rawHealth: number, staticCardText: string = '', actions: Action[] = [], playRequirements: PlayRequirement[], targeted: boolean = false, targetDomain: any, targetRequirements: TargetRequirement[]) {
        super(game, owner, zone, id, name, 'weapon', rawCost, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
        this.rawAttack = rawAttack
        this.attack = this.rawAttack

        this.game.event.on('afterAttack', (event) => this.afterAttack(event))
    }

    afterAttack(event) {
        if (this.inPlay() && event.attacker === this.controller().leader[0]) {
            this.loseCharge()
            this.updateStats()
        }
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
            attack: this.attack,
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

    baseStats() {
        return { attack: this.rawAttack, health: this.rawHealth }
    }

    setStats(stats) {
        this.attack = stats.attack
        this.health = stats.health
    }
}

export default WeaponCreation