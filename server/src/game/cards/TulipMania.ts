import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import { sumFriendlyFollowersHealth } from "../dictionaries/DynamicValueShortcuts";

const data: PermanentPassiveData = {
    id: 'TulipMania',
    name: {
        english: `Tulip Mania`,
    },
    type: 'Passive',
    subtype: 'Permanent',
    classes: ['Economy'],
    collectable: true,
    cost: 4,
    staticText: {
        english: `Passive: Your leader gains (temporary) Health equal to the total Health of your followers.`,
    },
    text: {
        templates: {
            english: `Passive: Your leader gains (temporary) Health equal to the total Health of your followers. $0`,
        },
        dynamicValues: [
            {
                value: sumFriendlyFollowersHealth,
                activeZones: 'inPlay',
                default: '',
                templates: {
                    english: '(+$ Health)'
                },
                requirements: [{
                    activeRequirement: 'charOwnerAlive',
                }]
            }
        ]
    },
    effects: ['TulipManiaAura'],
    ethos: true,
    
}

class TulipMania extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default TulipMania