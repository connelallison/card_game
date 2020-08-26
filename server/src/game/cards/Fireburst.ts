import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import MomentZoneString from '../stringTypes/MomentZoneString'
import ActionMoment from '../gameObjects/ActionMoment'

class Fireburst extends ActionMoment {
  constructor (game: Game, owner: GamePlayer, zone: MomentZoneString) {
    super(
      game, 
      owner, 
      zone, 
      'Fireburst', 
      'Fireburst', 
      true,
      1, 
      'Deal 4 damage to a follower with 4 or more attack.',
      [
        {
          operation: "damage",
          values: {
            damage: 4,
          },
        }  
      ],
      [],
      true, 
      ['enemyBoard', 'friendlyBoard'],
      [{
        targetRequirement: "minVal",
        values: {
          minVal: 4,
          param: 'attack'
        }
      }], 
    )
  }
}
export default Fireburst
