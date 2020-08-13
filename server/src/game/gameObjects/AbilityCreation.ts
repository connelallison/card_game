import Creation from "./Creation";
import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import ZoneString from "../stringTypes/ZoneString";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";
import TargetRequirement from "../functionTypes/TargetRequirement";
import ObjectReport from "../structs/ObjectReport";
import CreationZoneString from "../stringTypes/CreationZoneString";

abstract class AbilityCreation extends Creation {
    subtype: 'Ability'
    ready: boolean
    repeatable: boolean

    constructor(game: Game, owner: GamePlayer, zone: CreationZoneString, id: string, name: string, collectable: boolean, rawCost: number, rawHealth: number, staticCardText: string = '', actions: Action[] = [], playRequirements: PlayRequirement[], targeted: boolean = false, targetDomain: any, targetRequirements: TargetRequirement[], repeatable: boolean) {
        super(game, owner, zone, id, name, 'Ability', collectable, rawCost, rawHealth, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
        this.repeatable = repeatable
        this.ready = false

        this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
    }

    startOfTurn(event) {
        if (this.inPlay() && this.controller().myTurn()) this.ready = true
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
            canBeSelected: this.canBeSelected(),
            requiresTarget: this.targeted,
            validTargets: this.validTargetIDs(),
            staticCardText: this.staticCardText,
        }
    }

    updateValidTargets(): void {
        if ((this.zone === 'hand' || this.inPlay()) && this.targeted) {
          let newTargets = this.targetDomain(this.owner)
          this.targetRequirements.forEach(requirement => {
            newTargets = newTargets.filter(target => requirement(this, target))
          })
          this.validTargets = newTargets
        } else {
          this.validTargets = []
        }
      }

    canBeSelected(): boolean {
        if (this.inPlay()) {
          return this.canBeUsed()
        } else {
          return this.canBePlayed()
        }
      }

    canBeUsed(): boolean {
        return this.ready && this.controller().canUse(this)
    }
}

export default AbilityCreation