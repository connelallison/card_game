import Card from './Card'
import ObjectReport from '../structs/ObjectReport'
import Game from '../Game'
import GamePlayer from './GamePlayer'
import SpellZoneString from '../stringTypes/SpellZoneString'
import Action from '../functionTypes/Action'
import TargetRequirement from '../functionTypes/TargetRequirement'
import PlayRequirement from '../functionTypes/PlayRequirement'

abstract class Spell extends Card {
  zone: SpellZoneString
  type: 'spell'

  constructor (game: Game, owner: GamePlayer, zone: SpellZoneString, id: string, name: string, rawCost: number, staticCardText: string, actions: Action[], playRequirements: PlayRequirement[], targeted: boolean, targetDomain, targetConstraints: TargetRequirement[]) {
    super(game, owner, zone, id, name, 'spell', rawCost, staticCardText, actions, playRequirements, targeted, targetDomain, targetConstraints)
  }

  provideReport (): ObjectReport {
    this.updateFlags()
    this.updateValidTargets()

    return {
      name: this.name,
      id: this.id,
      objectID: this.objectID,
      cost: this.cost,
      type: this.type,
      zone: this.zone,
      ownerName: this.owner.name,
      playerID: this.owner.playerID,
      canBeSelected: this.canBePlayed(),
      requiresTarget: this.targeted,
      validTargets: this.validTargetIDs(),
      staticCardText: this.staticCardText,
    }
  }

  moveZone(destination: SpellZoneString): void {
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)
    this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }
}

export default Spell
