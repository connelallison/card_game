import FamousFollower from "../gameObjects/FamousFollower";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import FollowerZoneString from "../stringTypes/FollowerZoneString";

class PrinceTimothy extends FamousFollower {
  constructor(game: Game, owner: GamePlayer, zone: FollowerZoneString) {
    super(
      game,
      owner,
      zone,
      'PrinceTimothy',
      'Prince Timothy',
      true,
      3,
      3,
      5,
      'Action: Give all followers in your hand +1/+1 for every Knight you control.',
      [{
        operation: 'buffCharacterAttackAndHealth',
        values: {
          stats: {
            valueType: 'number',
            reducer: 'count',
            requirements: [{
              targetRequirement: 'isSpecificCardClass',
              values: {
                cardID: 'Knight',
              }
            }],
            targetDomain: 'friendlyBoard',
          }
        },
        targets: {
          valueType: 'target',
          targetDomain: 'friendlyHand',
          requirements: [{
            targetRequirement: 'isType',
            values: {
              type: 'Follower'
            }
          }
          ],
        }
      }],
      [],
      false,
      null,
      null
    )
  }
}

export default PrinceTimothy