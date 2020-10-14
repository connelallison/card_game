import Moment, { MomentData } from "./Moment";

export interface ActionMomentData extends MomentData {
  actions: ActionActionData[]
}

abstract class ActionMoment extends Moment {
  static readonly data: ActionMomentData
  readonly data: ActionMomentData
  subtype: 'Action'

  constructor(game: Game, owner: GamePlayer, data: ActionMomentData) {
    super(game, owner, data)
  }
}

export default ActionMoment

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { ActionActionData } from "../structs/Action";