import ActiveLeaderTechnique from "../gameObjects/ActiveLeaderTechnique";
import Game from "../gamePhases/Game";
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
            [],
            [[{
                actionType: 'autoAction',
                operation: 'summonCard',
                values: {
                    cardID: 'Knight',
                }
            }]],
            [{
                playRequirement: 'canSummonType',
                values: {
                    type: 'Follower',
                }
            }],
            [],
            false,
            null,
            null,
            false,
        )
    }
}

export default KingFredTheSaintlyRecruit