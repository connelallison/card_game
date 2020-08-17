import Game from '../gameSystems/Game'
import GamePlayer from '../gameObjects/GamePlayer'
import MomentZoneString from '../stringTypes/MomentZoneString'
import ActionOperations from '../dictionaries/ActionOperations'
import PlayRequirements from '../dictionaries/PlayRequirements'
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
      'Deal 3 damage to the weakest enemy unit and draw a card.',
      [
        {
          operation: 'damage',
          values: {
            damage: 3,
          },
          targets: {
            valueType: 'target',
            reducer: "min",
            criterionMap: (obj) => obj.attack,
            targetDomain: 'enemyBoard',
          }
        },
        { operation: 'draw' },
      ],
      [{
        playRequirement: 'minAllUnits',
        values: {
          min: 1,
        }
      }]
    )
  }
}
export default Consume