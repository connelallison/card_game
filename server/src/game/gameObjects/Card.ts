import GameObject from './GameObject'
import Game from '../gameSystems/Game'
import GamePlayer from './GamePlayer'
import ObjectReport from '../structs/ObjectReport'
import ZoneString from '../stringTypes/ZoneString'
import CardTypeString from '../stringTypes/CardTypeString'
import Action from '../functionTypes/Action'
import TargetRequirement from '../functionTypes/TargetRequirement'
import PlayRequirement from '../functionTypes/PlayRequirement'
import CardSubtypeString from '../stringTypes/CardSubtypeString'

abstract class Card extends GameObject {
  owner: GamePlayer
  type: CardTypeString
  subtype: CardSubtypeString
  collectable: boolean
  rawCost: number
  cost: number
  staticCardText: string
  actions: Action[]
  playRequirements: PlayRequirement[]
  targeted: boolean
  targetDomain: any
  targetRequirements: TargetRequirement[]
  validTargets: any

  constructor(game: Game, owner: GamePlayer, zone: ZoneString, id: string, name: string, type: CardTypeString, subtype: CardSubtypeString, collectable: boolean, rawCost: number, staticCardText: string = '', actions: Action[] = [], playRequirements: PlayRequirement[],  targeted: boolean = false, targetDomain: any, targetRequirements: TargetRequirement[]) {
    super(game, owner, id, name, type, subtype)
    this.zone = zone
    this.collectable = collectable
    this.rawCost = rawCost
    this.cost = rawCost
    this.staticCardText = staticCardText
    this.actions = actions
    this.playRequirements = playRequirements
    this.targeted = targeted
    this.targetDomain = targetDomain
    this.targetRequirements = targetRequirements
    this.validTargets = []
  }

  updateValidTargets(): void {
    if (this.zone === 'hand' && this.targeted) {
      let newTargets = this.targetDomain(this.owner)
      this.targetRequirements.forEach(requirement => {
        newTargets = newTargets.filter(target => requirement(this, target))
      })
      this.validTargets = newTargets
    } else {
      this.validTargets = []
    }
  }

  validTargetIDs(): string[] {
    return this.validTargets.map(target => target.objectID)
  }

  canBePlayed(): boolean {
    return this.controller().canPlay(this)
  }

  abstract provideReport(): ObjectReport 
  abstract moveZone(destination: ZoneString): void 
}
export default Card
