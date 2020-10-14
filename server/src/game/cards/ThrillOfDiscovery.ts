import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PermanentPassiveData = {
    id: 'ThrillOfDiscovery',
    name: {
        english: `Thrill of Discovery`,
    },
    type: 'Passive',
    subtype: 'Permanent',
    classes: ['Learning'],
    collectable: true,
    ethos: true,
    cost: 4,
    staticText: {
        english: `Passive: Before you play a famous follower from the far left or right of your hand, give it +0.5/+0.5.`,
    },
    text: {
        templates: {
            english: `Passive: Before you play a famous follower from the far left or right of your hand, give it +0.5/+0.5.`,
        },
    },
    tooltips: [],
    effects: ['ThrillOfDiscoveryTrigger'],
}

class ThrillOfDiscovery extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default ThrillOfDiscovery