import Card from './Card'
import ObjectReport from '../structs/ObjectReport'
import Game from '../gameSystems/Game'
import GamePlayer from './GamePlayer'
import SpellZoneString from '../stringTypes/SpellZoneString'
import Action from '../functionTypes/Action'
import TargetRequirement from '../functionTypes/TargetRequirement'
import PlayRequirement from '../functionTypes/PlayRequirement'

abstract class Spell extends Card {
  zone: SpellZoneString
  type: 'spell'
  subtype: 'event' | 'action'

  constructor (game: Game, owner: GamePlayer, zone: SpellZoneString, id: string, name: string, subtype: 'event' | 'action', rawCost: number, staticCardText: string, actions: Action[], playRequirements: PlayRequirement[], targeted: boolean, targetDomain, targetRequirements: TargetRequirement[]) {
    super(game, owner, zone, id, name, 'spell', subtype, rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
  }

  provideReport (): ObjectReport {
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
      canBeSelected: this.canBePlayed(),
      requiresTarget: this.targeted,
      validTargets: this.validTargetIDs(),
      staticCardText: this.staticCardText,
    }
  }

  moveZone(destination: SpellZoneString): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }
}

export default Spell
