import Game from "../gameSystems/Game";
import Leader from "../gameObjects/Leader";
import GamePlayer from "../gameObjects/GamePlayer";
import LeaderZoneString from "../stringTypes/LeaderZoneString";

class KingFredTheSaintly extends Leader {
    constructor(game: Game, owner: GamePlayer, zone: LeaderZoneString) {
          super(
              game, 
              owner, 
              zone, 
              'KingFredTheSaintly', 
              'King Fred, the Saintly', 
              true,
              0, 
              1, 
              8,
              '', 
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