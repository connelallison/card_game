import Card from './Card'
import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import MomentZoneString from '../stringTypes/MomentZoneString'
import TargetDomainString from '../stringTypes/TargetDomainString'
import ActionFunctionObject from '../structs/ActionFunctionObject'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import PlayRequirementObject from '../structs/PlayRequirementObject'

abstract class Moment extends Card {
  zone: MomentZoneString
  type: 'Moment'
  subtype: 'Event' | 'Action'

  constructor (game: Game, owner: GamePlayer, zone: MomentZoneString, id: string, name: string, subtype: 'Event' | 'Action', collectable: boolean, rawCost: number, staticCardText: string, actions: ActionFunctionObject[], playRequirements: PlayRequirementObject[], targeted: boolean, targetDomain: TargetDomainString | TargetDomainString[], targetRequirements: TargetRequirementObject[]) {
    super(game, owner, zone, id, name, 'Moment', subtype, collectable, rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetRequirements)
  }

  moveZone(destination: MomentZoneString): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }
}

export default Moment
