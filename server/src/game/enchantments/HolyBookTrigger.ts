import TriggerEnchantment from "../gameObjects/TriggerEnchantment";

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
                    targets: {
                        valueType: 'targets',
                        from: 'targetDomain',
                        targetDomain: ['friendlyBoard', 'friendlyLeader']
                    }
                }],
            }],
            false,
        )
    }
}

export default HolyBookTrigger

import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";