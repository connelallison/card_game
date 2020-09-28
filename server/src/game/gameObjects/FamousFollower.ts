import Follower, { FollowerData } from "./Follower";

export interface FamousFollowerData extends FollowerData {
    subtype: 'Famous'
}

abstract class FamousFollower extends Follower {
    static readonly data: FamousFollowerData
    readonly data: FamousFollowerData
    subtype: 'Famous'

    constructor(game: Game, owner: GamePlayer, data: FamousFollowerData) {
        super(game, owner, data)
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
            attack: this.attack,
            health: this.health,
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
            attackTargets: this.attackTargetsReport(),
            validSlots: this.validSlotsReport(),
          }
    }

    moveZone(destination: FollowerZoneString, index?: number): void {
        if (this.zone === 'board') {
          this.slot.follower = null
          this.slot = null
          this.game.inPlay.splice(this.game.inPlay.indexOf(this), 1)
        } else {
          this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
        }
    
        if (destination === 'board') {
          const slot = typeof index === 'number' ? this.controller().board[index] : this.controller().firstEmptySlot()
          if (slot instanceof BoardSlot) {
            slot.follower = this
            this.slot = slot
            this.game.inPlay.push(this)
          }
        } else {
            if (typeof index === 'number') this.owner[destination].splice(index, 0, this)
            else this.owner[destination].push(this)
        }
        this.zone = destination
        this.updateEnchantments()
      }

      cloneData(clone) {
        return {
          clonedFrom: this,
          pendingDestroy: this.pendingDestroy,
          rawCost: this.rawCost,
          cost: this.cost,
          rawAttack: this.rawAttack,
          attack: this.attack,
          rawHealth: this.rawHealth,
          health: this.health,
          maxHealth: this.maxHealth,
          actions: JSON.parse(JSON.stringify(this.actions)),
          events: JSON.parse(JSON.stringify(this.events)),
          enchantments: this.enchantments.map(enchantment => enchantment.clone(clone)),
          auraEffects: this.auraEffects.splice(0),
          flags: JSON.parse(JSON.stringify(this.flags)),
        }
      }
}

export default FamousFollower

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { LocalisationString } from "../structs/Localisation";
import { ObjectReport } from "../structs/ObjectReport";import { FollowerZoneString } from "../stringTypes/ZoneTypeSubtypeString";
import BoardSlot from "./BoardSlot";

