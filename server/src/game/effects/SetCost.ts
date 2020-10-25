import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
import { LocalisedStringObject } from "../structs/Localisation"

const data: StaticEffectData = {
    id: 'SetCost',
    name: {
        english: `Set Cost`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Set to 0 Cost.` } },
    stackable: false,
    effectObjs: [
        {
            operation: 'setCost',
            value: 0,
        }
    ]
}

class SetCost extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject, values: { cost: number, effectName?: LocalisedStringObject } = { cost: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.cost ?? 0
        moddedData.name = values.effectName ?? moddedData.name
        for (const localisation in moddedData.text.templates) {
            moddedData.text.templates[localisation] = moddedData.text.templates[localisation].replace(`0`, `${moddedData.effectObjs[0].value}`)
        }
        super(
            game,
            owner,
            moddedData
        )
    }
}
export default SetCost