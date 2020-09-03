import Moment from "./Moment";

export interface ActionMomentData {
  id: string
  name: string
  type: 'Moment'
  subtype: 'Action'
  collectable: boolean
  cost: number
  staticCardText: string
  actions: ActionActionObject[][]
  events?: EventActionObject[][]
  playRequirements?: ActiveRequirementObject[]
  enchantments?: EnchantmentIDString[]
  targeted: boolean
  targetDomain?: TargetsDomainString | TargetsDomainString[]
  targetRequirements?: TargetRequirementObject[]
}

abstract class ActionMoment extends Moment {
  static readonly data: ActionMomentData
  readonly data: ActionMomentData
  subtype: 'Action'

  constructor(
    game: Game,
    owner: GamePlayer,
    data: ActionMomentData,
  ) {
    const { id, name, collectable, cost, staticCardText, actions, targeted } = data 
    const targetDomain = data.targetDomain || []
    const targetRequirements = data.targetRequirements || []
    const events = data.events || []
    const enchantments = data.enchantments || []
    const playRequirements = data.playRequirements || []
    super(
      game,
      owner,
      id,
      name,
      'Action',
      collectable,
      cost,
      staticCardText,
      actions,
      events,
      playRequirements,
      enchantments,
      targeted,
      targetDomain,
      targetRequirements
    )
    this.data = data
  }
}

export default ActionMoment

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";