import Card from './Card'

abstract class Moment extends Card {
  zone: MomentZoneString
  type: 'Moment'
  subtype: 'Event' | 'Action'

  constructor(
    game: Game,
    owner: GamePlayer,
    id: string,
    name: string,
    subtype: 'Event' | 'Action',
    collectable: boolean,
    rawCost: number,
    staticCardText: string,
    actions: ActionActionObject[][],
    events: EventActionObject[][],
    playRequirements: ActiveRequirementObject[],
    enchantments: EnchantmentIDString[],
    targeted: boolean,
    targetDomain: TargetsDomainString | TargetsDomainString[],
    targetRequirements: TargetRequirementObject[]
  ) {
    super(
      game,
      owner,
      id,
      name,
      'Moment',
      subtype,
      collectable,
      rawCost,
      staticCardText,
      actions,
      events,
      playRequirements,
      enchantments,
      targeted,
      targetDomain,
      targetRequirements
    )
  }

  moveZone(destination: MomentZoneString): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }
}

export default Moment

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { MomentZoneString } from '../stringTypes/ZoneString'
import { ActionActionObject, EventActionObject } from '../structs/ActionObject'
import ActiveRequirementObject from '../structs/ActiveRequirementObject'
import { EnchantmentIDString } from '../stringTypes/DictionaryKeyString'
import { TargetsDomainString } from '../stringTypes/DomainString'
import TargetRequirementObject from '../structs/TargetRequirementObject'