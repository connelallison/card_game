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
      classes: this.classes,
      zone: this.zone,
      ownerName: this.owner.playerName,
      playerID: this.owner.objectID,
      canBeSelected: this.canBeSelected(),
      staticText: this.staticText[localisation],
      text: this.generateDynamicText(this.text, localisation),
      tooltips: this.tooltipsReport(),
      addedText: this.addedTextReport(),
      relatedCard: this.relatedCardReport(),
      categories: this.categoriesReport(),
      options: this.optionsReport(localisation),
      actions: this.actionsReport(localisation),
      attackTargets: this.attackTargetsReport(),
      validSlots: this.validSlotsReport(),
    }
  }

  static provideReport(localisation: LocalisationString = 'english'): StaticObjectReport {
    return {
      name: this.data.name[localisation],
      id: this.data.id[localisation],
      cost: this.data.cost,
      attack: this.data.attack,
      health: this.data.health,
      categories: this.data.categories ?? [],
      type: this.data.type,
      subtype: this.data.subtype,
      text: this.data.staticText[localisation],
      classes: this.data.classes,
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
    this.updateEffects()
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
      // options: JSON.parse(JSON.stringify(this.options)),
      // actions: JSON.parse(JSON.stringify(this.actions)),
      // events: JSON.parse(JSON.stringify(this.events)),
      // deathEvents: JSON.parse(JSON.stringify(this.deathEvents)),
      // effects: this.effects.map(effect => effect.clone(clone)),
      auraEffects: this.auraEffects.splice(0),
      flags: JSON.parse(JSON.stringify(this.flags)),
    }
  }
}

export default FamousFollower

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { LocalisationString } from "../structs/Localisation";
import { ObjectReport, StaticObjectReport } from "../structs/ObjectReport"; import { FollowerZoneString } from "../stringTypes/ZoneTypeSubtypeString";
import BoardSlot from "./BoardSlot";

