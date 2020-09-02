import Game from "../gamePhases/Game";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import GameObject from "../gameObjects/GameObject";

class HolyBookTrigger extends TriggerEnchantment {
    constructor(game: Game, owner: GameObject) {
        super(
            game,
            owner,
            'HolyBookTrigger',
            'Holy Book Trigger',
            ['creationZone'],
            ['Creation'],
            [],
            true,
            [{
                eventType: 'endOfTurn',
                requirements: [{
                    playRequirement: "isMyTurn"
                }],
                actions: [{
                    actionType: 'autoAction',
                    operation: 'heal',
                    values: {
                        healing: 1,
                    },
                    targets: ['friendlyBoard', 'friendlyLeader']
                }],
            }],
            false,
        )
    }
}

export default HolyBookTrigger