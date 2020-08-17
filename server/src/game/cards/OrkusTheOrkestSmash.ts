import ActiveLeaderAbility from "../gameObjects/ActiveLeaderAbility";
import Game from "../gameSystems/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import LeaderAbilityZoneString from "../stringTypes/LeaderAbilityZoneString";
import PlayRequirements from "../dictionaries/PlayRequirements";

class OrkusTheOrkestSmash extends ActiveLeaderAbility {
    constructor(game: Game, owner: GamePlayer, zone: LeaderAbilityZoneString) {
        super(
            game,
            owner,
            zone,
            'OrkusTheOrkestSmash',
            'Smash',
            2,
            'Deal 2 damage to a unit.',
            [{
                operation: 'damage',
                values: {
                    damage: 2,
                },
            }],
            [{
                playRequirement: "minAllUnits",
                values: {
                    min: 1,
                }
            }],
            true,
            ['enemyBoard', 'friendlyBoard'],
            [],
            false,
        )
    }
}

export default OrkusTheOrkestSmash