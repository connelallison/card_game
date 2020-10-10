import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
import { LocalisedStringObject } from "../structs/Localisation"

const data: StaticEffectData = {
    id: 'CostReduction',
    name: {
        english: `Cost Reduction`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `-0 Cost` } },
    activeTypes: 'Card',
    effectObjs: [
        {
            operation: 'decreaseCost',
            value: 0
        }
    ]
}

class CostReduction extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject, values: { money: number, buffName?: LocalisedStringObject } = { money: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.money || 0
        moddedData.name = values.buffName ?? moddedData.name
        for (const localisation in moddedData.text.templates) {
            moddedData.text.templates[localisation] = moddedData.text.templates[localisation].replace(`-0`, `-${moddedData.effectObjs[0].value}`)
        }
        super(
            game,
            owner,
            moddedData
        )
    }
}
export default CostReduction