import FamousFollower from "../gameObjects/FamousFollower";
import Game from "../gameSystems/Game";
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
        operation: "summonCard",
        values: {
          cardID: {
            valueType: 'target',
            reducer: 'last',
            targetDomain: 'deathEvents',
            requirements: [{
              targetRequirement: 'isFriendly',
              targetMap: (event: DeathEvent) => event.died,
            }, {
              targetRequirement: 'isType',
              values: {
                type: 'Follower',
              },
              targetMap: (event: DeathEvent) => event.died
            }],
            resultMap: (event) => event.died.id
          } as DynamicTargetObject
        }
      }
      ],
      [],
      false,
      null,
      null
    )
  }
}

export default Orcissimus