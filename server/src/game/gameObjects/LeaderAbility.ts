import Game from "../gameSystems/Game";
import GamePlayer from "./GamePlayer";
import Action from "../functionTypes/Action";
import PlayRequirement from "../functionTypes/PlayRequirement";
import TargetRequirement from "../functionTypes/TargetRequirement";
import PersistentCard from "./PersistentCard";
import LeaderAbilitySubtypeString from "../stringTypes/LeaderAbilitySubtypeString";
import LeaderAbilityZoneString from "../stringTypes/LeaderAbilityZoneString";
import ObjectReport from "../structs/ObjectReport";

abstract class LeaderAbility extends PersistentCard {
    collectable: false
    inPlayZone: 'leaderAbilityZone'
    ready: boolean
    repeatable: boolean
    type: 'LeaderAbility'
    subtype: LeaderAbilitySubtypeString
    zone: LeaderAbilityZoneString

    constructor(game: Game, owner: GamePlayer, zone: LeaderAbilityZoneString, id: string, name: string, subtype: LeaderAbilitySubtypeString, rawCost: number, staticCardText: string = '', actions: Action[] = [], playRequirements: PlayRequirement[], targeted: boolean = false, targetDomain: any, targetRequirements: TargetRequirement[], repeatable: boolean) {
        super(game, owner, zone, id, name, 'LeaderAbility', subtype, false, rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
        this.repeatable = repeatable
        this.ready = false
        this.inPlayZone = 'leaderAbilityZone'

        this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
    }

    startOfTurn(event) {
        if (this.inPlay() && this.controller().myTurn()) this.ready = true
    }

    provideReport(): ObjectReport {
        this.updateFlags()
        this.updateValidTargets()

        return {
            name: this.name,
            id: this.id,
            objectID: this.objectID,
            cost: this.cost,
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
        if (this.inPlay() && this.targeted) {
          let newTargets = this.targetDomain(this.owner)
          this.targetRequirements.forEach(requirement => {
            newTargets = newTargets.filter(target => requirement(this, target))
          })
          this.validTargets = newTargets
        } else {
          this.validTargets = []
        }
      }

    inPlay(): boolean {
        return this.zone === 'leaderAbilityZone'
    }

    moveZone(destination: LeaderAbilityZoneString): void {
        if (this.zone !== 'setAside') this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
        this.owner[destination].push(this)
        this.zone = destination
        this.updateEnchantments()
    }

    canBeSelected(): boolean {
        return this.inPlay() && this.canBeUsed()
      }

    canBeUsed(): boolean {
        return this.ready && this.controller().canUse(this)
    }
}

export default LeaderAbility