import Moment from "./Moment";

export interface EventMomentData {
  id: string
  name: string
  type: 'Moment'
  subtype: 'Event'
  collectable: boolean
  cost: number
  staticCardText: string
  events: EventActionObject[][]
  playRequirements?: ActiveRequirementObject[]
  enchantments?: EnchantmentIDString[]
}

abstract class EventMoment extends Moment {
  static readonly data: EventMomentData
  readonly data: EventMomentData
  subtype: 'Event'
  targeted: false
  targetDomain: null
  targetRequirements: null

  constructor(
    game: Game,
    owner: GamePlayer,
    data: EventMomentData
  ) {
    const { id, name, collectable, cost, staticCardText, events } = data
    const enchantments = data.enchantments || []
    const playRequirements = data.playRequirements || []
    super (
      game,
      owner,
      id,
      name,
      'Event',
      collectable,
      cost,
      staticCardText,
      [[]],
      events,
      playRequirements,
      enchantments,
      false,
      null,
      null
    )
    this.data = data
  }
}

export default EventMoment

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";