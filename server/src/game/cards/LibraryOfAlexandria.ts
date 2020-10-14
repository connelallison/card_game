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
        english: `Your Works and Techniques are Immune until your opponent plays 3 leftmost or rightmost cards.`,
    },
    text: {
        templates: {
            english: `Your Works and Techniques are Immune until your opponent plays $0 leftmost or rightmost cards.`,
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
    effects: ['LibraryOfAlexandriaAura', 'LibraryOfAlexandriaTrigger'],
}

class LibraryOfAlexandria extends WonderCreation {
    static readonly data: WonderCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default LibraryOfAlexandria