import WorkCreation, { WorkCreationData } from "../gameObjects/WorkCreation";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WorkCreationData = {
    id: 'MutuallyAssuredDestruction',
    name: {
        english: `Mutually Assured Destruction`,
    },
    type: 'Creation',
    subtype: 'Work',
    classes: ['All'],
    collectable: false,
    cost: 2,
    charges: 2,
    staticText: {
        english: `After a leader attacks, they take 60 Rot damage. Then, their opponent takes 60 Rot damage.`,
    },
    text: {
        templates: {
            english: `After a leader attacks, they take 60 Rot damage. Then, their opponent takes 60 Rot damage.`,
        },
    },
    tooltips: ['rotDamage'],
    effects: ['MutuallyAssuredDestructionTrigger'],
}

class MutuallyAssuredDestruction extends WorkCreation {
    static readonly data: WorkCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default MutuallyAssuredDestruction