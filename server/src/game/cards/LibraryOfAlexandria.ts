import WonderCreation, { WonderCreationData } from "../gameObjects/WonderCreation"
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WonderCreationData = {
    id: 'LibraryOfAlexandria',
    name: {
        english: `Library of Alexandria`,
    },
    type: 'Creation',
    subtype: 'Wonder',
    classes: ['Learning'],
    collectable: true,
    cost: 2,
    charges: 3,
    staticText: {
        english: `After you play a work or technique, draw a card.`,
    },
    text: {
        templates: {
            english: `After you play a work or technique, draw a card.`,
        },
        dynamicValues: [
            {
                default: 3,
                value: {
                    valueType: 'number',
                    from: 'target',
                    numberMap: 'charges',
                    target: {
                        valueType: 'target',
                        from: 'self'
                    },
                },
            }
        ],
    },
    effects: ['LibraryOfAlexandriaTrigger'],
}

class LibraryOfAlexandria extends WonderCreation {
    static readonly data: WonderCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default LibraryOfAlexandria