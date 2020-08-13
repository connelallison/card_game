import NamedUnit from "../gameObjects/NamedUnit";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import UnitZoneString from "../stringTypes/UnitZoneString";
import Actions from "../dictionaries/Actions";

class OrkusTheOrkest extends NamedUnit {
    constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
        super(
          game, 
          owner, 
          zone, 
          'OrkusTheOrkest', 
          'Orkus the Orkest', 
          true,
          4, 
          4, 
          5, 
          'Action: Summon the last friendly minion that died.', 
          [Actions.summonLastFriendlyUnitThatDied()], 
          [],
          false, 
          null, 
          null
        )
      }
}

export default OrkusTheOrkest