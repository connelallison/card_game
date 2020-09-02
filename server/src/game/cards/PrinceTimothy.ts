import FamousFollower from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
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
      [],
      true,
      3,
      3,
      5,
      'Event: Give all followers in your hand +1/+1 for every Knight you control.',
      [],
      [[{
        actionType: 'autoAction',
        operation: 'buffCharacterAttackAndHealth',
        values: {
          stats: {
            valueType: 'number',
            from: 'numbers',
            reducer: 'count',
            numbers: {
              valueType: 'numbers',
              from: 'targets',
              numberMap: 'count',
              targets: {
                valueType: 'targets',
                from: 'targetDomain',
                requirements: [{
                  targetRequirement: 'isSpecificCardClass',
                  values: {
                    cardID: 'Knight',
                  }
                }],
                targetDomain: 'friendlyBoard',

              }
            }
          }
        },
        targets: {
          valueType: 'targets',
          from: 'targetDomain',
          targetDomain: 'friendlyHand',
          requirements: [{
            targetRequirement: 'isType',
            values: {
              type: 'Follower'
            }
          }
          ],
        }
      }]],
      [],
      [],
      false,
      null,
      null
    )
  }
}

export default PrinceTimothy