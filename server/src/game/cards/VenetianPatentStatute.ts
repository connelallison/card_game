import WorkCreation, { WorkCreationData } from "../gameObjects/WorkCreation";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WorkCreationData = {
    id: 'VenetianPatentStatute',
    name: {
        english: `Venetian Patent Statute`,
    },
    type: 'Creation',
    subtype: 'Work',
    classes: ['Learning'],
    collectable: true,
    cost: 1,
    charges: 4,
    staticText: {
        english: `Before you play a creation, give it Fortune.`,
    },
    text: {
        templates: {
            english: `Before you play a creation, give it Fortune.`,
        },
    },
    effects: ['VenetianPatentStatuteTrigger'],
}

class VenetianPatentStatute extends WorkCreation {
    static readonly data: WorkCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default VenetianPatentStatute