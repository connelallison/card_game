import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PermanentPassiveData = {
    id: 'PeacefulResistance',
    name: {
        english: `Peaceful Resistance`,
    },
    type: 'Passive',
    subtype: 'Permanent',
    classes: ['The People'],
    collectable: true,
    ethos: true,
    cost: 4,
    staticText: {
        english: `Passive: If your followers don't attack, you restore Health to your Leader equal to their Attack.`,
    },
    text: {
        templates: {
            english: `Passive: If your followers don't attack, you restore Health to your Leader equal to their Attack.`,
        },
    },
    tooltips: [],
    effects: ['PeacefulResistanceTrigger'],
}

class PeacefulResistance extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default PeacefulResistance