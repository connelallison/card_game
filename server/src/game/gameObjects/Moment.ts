import Card, { CardData } from './Card'

export interface MomentData extends CardData {
  type: 'Moment'
  subtype: MomentSubtypeString,
}

abstract class Moment extends Card {
  static readonly data: MomentData
  readonly data: MomentData
  zone: MomentZoneString
  type: 'Moment'
  subtype: MomentSubtypeString

  constructor(game: Game, owner: GamePlayer, data: MomentData) {
    super(game, owner, data)
  }

  moveZone(destination: MomentZoneString, index?: number): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    if (typeof index === 'number') this.owner[destination].splice(index, 0, this)
    else this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }
}

export default Moment

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { MomentZoneString } from '../stringTypes/ZoneString'
import { MomentSubtypeString } from '../stringTypes/ObjectSubtypeString'