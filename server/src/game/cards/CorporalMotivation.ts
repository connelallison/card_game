import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import CreationZoneString from '../stringTypes/CreationZoneString'
import AbilityCreation from '../gameObjects/AbilityCreation'

class CorporalMotivation extends AbilityCreation {
  constructor(game: Game, owner: GamePlayer, zone: CreationZoneString) {
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
      [
        {
          operation: "damage",
          values: {
            damage: 1,
          },
        },
        {
          operation: 'buffCharacterAttack',
          values: {
            attack: 3,
          }
        }
      ],
      [],
      true,
      ['enemyBoard', 'friendlyBoard'],
      [],
      false,
    )
  }
}
export default CorporalMotivation