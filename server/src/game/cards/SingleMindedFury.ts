import PermanentPassive, { PermanentPassiveData } from "../gameObjects/PermanentPassive";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";
import { lastEnemyFollowerEnteredPlay } from "../dictionaries/DynamicValueShortcuts";

const data: PermanentPassiveData = {
    id: 'SingleMindedFury',
    name: {
        english: `Single-Minded Fury`,
    },
    type: 'Passive',
    subtype: 'Permanent',
    classes: ['Empire'],
    collectable: true,
    cost: 4,
    ethos: true,
    effects: ['SingleMindedFuryTrigger'],
    staticText: {
        english: `Passive: Your opponent's most recently summoned minion takes 1 extra damage from all sources.`,
    },
    text: {
        templates: {
            english: `Passive: Your opponent's most recently summoned minion takes 1 extra damage from all sources. $0`,
        },
        dynamicValues: [
            {
                value: {
                    valueType: 'localisedString',
                    from: "target",
                    stringMap: "name",
                    target: lastEnemyFollowerEnteredPlay,
                },
                activeZones: 'inPlay',
                default: '',
                templates: {
                    english: '($)'
                }
            }
        ]
    },
}

class SingleMindedFury extends PermanentPassive {
    static readonly data: PermanentPassiveData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default SingleMindedFury