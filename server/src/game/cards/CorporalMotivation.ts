import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import CreationZoneString from '../stringTypes/CreationZoneString'
import Actions from '../dictionaries/Actions'
import AbilityCreation from '../gameObjects/AbilityCreation'

class CorporalMotivation extends AbilityCreation {
  constructor (game: Game, owner: GamePlayer, zone: CreationZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'CorporalMotivation', 
      'Corporal Motivation', 
      true,
      1, 
      3,
      'Deal 1 damage to a unit, then give it +3 Attack.',
      [Actions.damageChosenTarget(1), Actions.buffCharactersAttack(3)],
      [],
      true, 
      game.utils.targetDomain(['enemyUnits', 'friendlyUnits',]),
      [], 
      false,
    )
  }
}
export default CorporalMotivation