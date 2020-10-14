import WonderCreation, { WonderCreationData } from "../gameObjects/WonderCreation"
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WonderCreationData = {
    id: 'TwelveTables',
    name: {
        english: `Twelve Tables`,
    },
    type: 'Creation',
    subtype: 'Wonder',
    classes: ['The People'],
    collectable: true,
    cost: 2,
    charges: 3,
    staticText: {
        english: `After you draw a follower, summon two 1/1 Citizens.`,
    },
    text: {
        templates: {
            english: `After you draw a follower, summon two 1/1 Citizens.`,
        },
    },
    effects: ['TwelveTablesTrigger'],
}

class TwelveTables extends WonderCreation {
    static readonly data: WonderCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default TwelveTables