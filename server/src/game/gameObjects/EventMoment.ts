import Moment, { MomentData } from "./Moment";

export interface EventMomentData extends MomentData {
  events: EventAction[]
}

abstract class EventMoment extends Moment {
  static readonly data: EventMomentData
  readonly data: EventMomentData
  subtype: 'Event'
  targeted: false
  actions: []
  targetDomain: null
  targetRequirements: null

  constructor(game: Game, owner: GamePlayer, data: EventMomentData) {
    super(game, owner, data)
  }
}

export default EventMoment

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { EventAction } from "../structs/Action";