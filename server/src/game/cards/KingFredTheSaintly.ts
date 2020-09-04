import Leader from "../gameObjects/Leader";

class KingFredTheSaintly extends Leader {
    constructor(game: Game, owner: GamePlayer) {
          super(
              game, 
              owner, 
              'KingFredTheSaintly', 
              'King Fred, the Saintly', 
              true,
              0, 
              1, 
              8,
              '', 
              [], 
              [],
              [],
              [],
              false, 
              null, 
              null,
              'KingFredTheSaintlyRecruit'
              ) 
      }
  }

export default KingFredTheSaintly

import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";