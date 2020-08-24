import ActiveLeaderTechnique from "../gameObjects/ActiveLeaderTechnique";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import LeaderTechniqueZoneString from "../stringTypes/LeaderTechniqueZoneString";

class KingFredTheSaintlyRecruit extends ActiveLeaderTechnique {
    constructor(game: Game, owner: GamePlayer, zone: LeaderTechniqueZoneString) {
        super(
            game,
            owner,
            zone,
            'KingFredTheSaintlyRecruit',
            'Recruit',
            2,
            'Summon a 2/2 Knight.',
            [{
                operation: 'summonCard',
                values: {
                    cardID: 'Knight',
                }
            }],
            [{
                playRequirement: 'canSummonType',
                values: {
                    type: 'Follower',
                }
            }],
            false,
            null,
            null,
            false,
        )
    }
}

export default KingFredTheSaintlyRecruit