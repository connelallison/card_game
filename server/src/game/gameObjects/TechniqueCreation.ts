import Creation, { CreationData } from "./Creation";

export interface TechniqueCreationData extends CreationData {
  subtype: 'Technique'
}

abstract class TechniqueCreation extends Creation {
  static readonly data: TechniqueCreationData
  readonly data: TechniqueCreationData
  subtype: 'Technique'
  ready: boolean

  constructor(game: Game, owner: GamePlayer, data: TechniqueCreationData) {
    super(game, owner, data)
    this.ready = true

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  startOfTurn(event) {
    if (this.inPlay() && this.controller().myTurn()) this.ready = true
  }

  canBeSelected(): boolean {
    if (this.inPlay()) {
      return this.canBeUsed()
    } else {
      return this.canBePlayed()
    }
  }

  canBeUsed(): boolean {
    return this.ready && this.controller().canUse(this)
  }

  actionsActive(): boolean {
    return this.controller().myTurn() && (this.zone === 'creationZone' || this.zone === 'hand')
  }
}

export default TechniqueCreation

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";