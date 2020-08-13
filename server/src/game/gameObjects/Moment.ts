import Card from './Card'
import ObjectReport from '../structs/ObjectReport'
import Game from '../gameSystems/Game'
import GamePlayer from './GamePlayer'
import MomentZoneString from '../stringTypes/MomentZoneString'
import Action from '../functionTypes/Action'
import TargetRequirement from '../functionTypes/TargetRequirement'
import PlayRequirement from '../functionTypes/PlayRequirement'

abstract class Moment extends Card {
  zone: MomentZoneString
  type: 'Moment'
  subtype: 'Event' | 'Action'

  constructor (game: Game, owner: GamePlayer, zone: MomentZoneString, id: string, name: string, subtype: 'Event' | 'Action', collectable: boolean, rawCost: number, staticCardText: string, actions: Action[], playRequirements: PlayRequirement[], targeted: boolean, targetDomain, targetRequirements: TargetRequirement[]) {
    super(game, owner, zone, id, name, 'Moment', subtype, collectable, rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
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

  moveZone(destination: MomentZoneString): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }
}

export default Moment
