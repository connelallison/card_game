import WonderCreation, { WonderCreationData } from "../gameObjects/WonderCreation"
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WonderCreationData = {
    id: 'KnightAcademy',
    name: {
        english: `Knight Academy`,
    },
    type: 'Creation',
    subtype: 'Wonder',
    classes: ['The People'],
    collectable: true,
    cost: 2,
    charges: 3,
    staticText: {
        english: `After you draw a follower, summon a 2/2 Knight.`,
    },
    text: {
        templates: {
            english: `After you draw a follower, summon a 2/2 Knight.`,
        },
    },
    effects: ['KnightAcademyTrigger'],
}

class KnightAcademy extends WonderCreation {
    static readonly data: WonderCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default KnightAcademy