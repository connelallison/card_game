import FamousFollower from "../gameObjects/FamousFollower";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import FollowerZoneString from "../stringTypes/FollowerZoneString";
import DynamicTargetObject from "../structs/DynamicTargetObject";
import DeathEvent from "../gameEvents/DeathEvent";

class Orcissimus extends FamousFollower {
  constructor(game: Game, owner: GamePlayer, zone: FollowerZoneString) {
    super(
      game,
      owner,
      zone,
      'Orcissimus',
      'Orcissimus',
      true,
      4,
      4,
      5,
      'Action: Summon the last friendly minion that died.',
      [{
        actionType: 'autoAction',
        operation: "summonCard",
        values: {
          cardID: {
            valueType: 'string',
            from: 'target',
            stringMap: 'classID',
            target: {
              valueType: 'target',
              from: 'targets',
              reducer: 'last',
              targets: {
                valueType: 'targets',
                from: 'events',
                targetMap: 'deathEventDestroyedTarget',
                requirements: [{
                  targetRequirement: 'isFriendly',
                }, {
                  targetRequirement: 'isType',
                  values: {
                    type: 'Follower',
                  },
                }],
                events: {
                  valueType: 'events',
                  from: 'eventDomain',
                  eventDomain: 'deathEvents',
                }
              }
            }

          }
        }
      }
      ],
      [],
      [],
      false,
      null,
      null
    )
  }
}

export default Orcissimus