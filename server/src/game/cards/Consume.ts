import Game from '../gamePhases/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import MomentZoneString from '../stringTypes/MomentZoneString'
import EventMoment from '../gameObjects/EventMoment'

class Consume extends EventMoment {
  constructor(game: Game, owner: GamePlayer, zone: MomentZoneString) {
    super(
      game,
      owner,
      zone,
      'Consume',
      'Consume',
      true,
      3,
      'Deal 3 damage to the weakest enemy follower and draw a card.',
      [
        {
          actionType: 'autoAction',
          operation: 'damage',
          values: {
            damage: 3,
          },
          targets: {
            valueType: 'target',
            from: 'targets',
            reducer: "min",
            criterionMap: 'health',
            targets: {
              valueType: 'targets',
              from: 'targetDomain',
              targetDomain: 'enemyBoard',
            },
          }
        },
        { 
          actionType: 'autoAction',
          operation: 'draw',
        },
      ],
      [{
        playRequirement: 'minEnemyFollowers',
        values: {
          min: 1,
        }
      }],
      [],
    )
  }
}
export default Consume