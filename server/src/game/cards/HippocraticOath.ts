import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: PermanentPassiveData = {
    id: 'HippocraticOath',
    name: {
        english: `Hippocratic Oath`,
    },
    type: 'Passive',
    subtype: 'Permanent',
    classes: ['Learning'],
    collectable: true,
    ethos: true,
    cost: 4,
    staticText: {
        english: `Passive: All healing to friendly characters is nourish healing.`,
    },
    text: {
        templates: {
            english: `Passive: All healing to friendly characters is nourish healing.`,
        },
    },
    tooltips: ['nourishHealing'],
    effects: ['HippocraticOathTrigger'],
}

class HippocraticOath extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default HippocraticOath