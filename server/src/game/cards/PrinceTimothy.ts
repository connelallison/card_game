import NamedUnit from "../gameObjects/NamedUnit";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import UnitZoneString from "../stringTypes/UnitZoneString";

class PrinceTimothy extends NamedUnit {
  constructor(game: Game, owner: GamePlayer, zone: UnitZoneString) {
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
      'Action: Give all units in your hand +1/+1 for every Knight you control.',
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
              type: 'Unit'
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