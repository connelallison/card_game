import ActiveLeaderTechnique from "../gameObjects/ActiveLeaderTechnique";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import LeaderTechniqueZoneString from "../stringTypes/LeaderTechniqueZoneString";
import ActiveRequirements from "../dictionaries/ActiveRequirements";

class OrkusTheOrkestSmash extends ActiveLeaderTechnique {
    constructor(game: Game, owner: GamePlayer, zone: LeaderTechniqueZoneString) {
        super(
            game,
            owner,
            zone,
            'OrkusTheOrkestSmash',
            'Smash',
            2,
            'Deal 2 damage to a follower.',
            [[{
                actionType: 'manualAction',
                operation: 'damage',
                values: {
                    damage: 2,
                },
            }]],
            [],
            [{
                playRequirement: "minAllFollowers",
                values: {
                    min: 1,
                }
            }],
            [],
            true,
            ['enemyBoard', 'friendlyBoard'],
            [],
            false,
        )
    }
}

export default OrkusTheOrkestSmash