import Card from './Card'
import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import MomentZoneString from '../stringTypes/MomentZoneString'
import TargetsDomainString from '../stringTypes/TargetsDomainString'
import TargetRequirementObject from '../structs/TargetRequirementObject'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'
import ActionObject from '../structs/ActionObject'
import EnchantmentIDString from '../stringTypes/EnchantmentIDString'

abstract class Moment extends Card {
  zone: MomentZoneString
  type: 'Moment'
  subtype: 'Event' | 'Action'

  constructor (game: Game, owner: GamePlayer, zone: MomentZoneString, id: string, name: string, subtype: 'Event' | 'Action', collectable: boolean, rawCost: number, staticCardText: string, actions: ActionObject[], playRequirements: ActiveRequirementObject[], enchantments: EnchantmentIDString[], targeted: boolean, targetDomain: TargetsDomainString | TargetsDomainString[], targetRequirements: TargetRequirementObject[]) {
    super(game, owner, zone, id, name, 'Moment', subtype, collectable, rawCost, staticCardText, actions, playRequirements, enchantments, targeted, targetDomain, targetRequirements)
  }

  moveZone(destination: MomentZoneString): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }
}

export default Moment
