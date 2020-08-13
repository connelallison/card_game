import NamedUnit from "../gameObjects/NamedUnit";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import UnitZoneString from "../stringTypes/UnitZoneString";
import Actions from "../dictionaries/Actions";

class PrinceTimothy extends NamedUnit {
    constructor (game: Game, owner: GamePlayer, zone: UnitZoneString) {
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
          [Actions.handBuffPerFriendlyKnight()], 
          [],
          false, 
          null, 
          null
        )
      }
}

export default PrinceTimothy