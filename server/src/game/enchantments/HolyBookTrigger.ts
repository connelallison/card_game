import Game from "../gamePhases/Game";
import WorkCreation from "../gameObjects/WorkCreation";
import TriggerEnchantment from "../gameObjects/TriggerEnchantment";
import TriggerRequirements from "../dictionaries/TriggerRequirements";
import ActionOperations from "../dictionaries/ActionOperations";

class HolyBookTrigger extends TriggerEnchantment {
    owner: WorkCreation
    constructor(game: Game, owner: WorkCreation) {
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
                    operation: 'heal',
                    values: {
                        healing: 1,
                    },
                    targets: ['friendlyBoard', 'friendlyLeader']
                }],
            }]
        )
    }
}

export default HolyBookTrigger