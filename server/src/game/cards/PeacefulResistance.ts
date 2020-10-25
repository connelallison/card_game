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
        english: `Passive: After a friendly character doesn't use their attack, Nourish 1 Health to them.`,
    },
    text: {
        templates: {
            english: `Passive: After a friendly character doesn't use their attack, Nourish 1 Health to them.`,
        },
    },
    tooltips: ['nourishHealing'],
    effects: ['PeacefulResistanceTrigger'],
}

class PeacefulResistance extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default PeacefulResistance