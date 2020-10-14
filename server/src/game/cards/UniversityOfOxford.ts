import WonderCreation, { WonderCreationData } from "../gameObjects/WonderCreation"
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WonderCreationData = {
    id: 'UniversityOfOxford',
    name: {
        english: `University of Oxford`,
    },
    type: 'Creation',
    subtype: 'Wonder',
    classes: ['Learning'],
    collectable: true,
    cost: 2,
    charges: 3,
    staticText: {
        english: `After you draw a famous follower, give followers in your hand +1/+1.`,
    },
    text: {
        templates: {
            english: `After you draw a famous follower, give followers in your hand +1/+1.`,
        },
    },
    effects: ['UniversityOfOxfordTrigger'],
}

class UniversityOfOxford extends WonderCreation {
    static readonly data: WonderCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default UniversityOfOxford