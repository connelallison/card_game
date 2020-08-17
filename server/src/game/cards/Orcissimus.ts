import NamedUnit from "../gameObjects/NamedUnit";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import UnitZoneString from "../stringTypes/UnitZoneString";
import DynamicTargetObject from "../structs/DynamicTargetObject";
import DeathEvent from "../gameEvents/DeathEvent";

class Orcissimus extends NamedUnit {
  constructor(game: Game, owner: GamePlayer, zone: UnitZoneString) {
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
                type: 'Unit',
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