import TechniqueCreation from '../gameObjects/TechniqueCreation'

class CorporalMotivation extends TechniqueCreation {
  constructor(game: Game, owner: GamePlayer) {
    super(
      game,
      owner,
      'CorporalMotivation',
      'Corporal Motivation',
      true,
      1,
      3,
      'Action: Deal 1 damage to a follower, then give it +3 Attack.',
      [[
        {
          actionType: 'manualAction',
          operation: "damage",
          values: {
            damage: 1,
          },
        },
        {
          actionType: 'manualAction',
          operation: 'buffCharacterAttack',
          values: {
            attack: 3,
          }
        }
      ]],
      [],
      [],
      [],
      true,
      ['enemyBoard', 'friendlyBoard'],
      [],
      false,
    )
  }
}
export default CorporalMotivation

import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'