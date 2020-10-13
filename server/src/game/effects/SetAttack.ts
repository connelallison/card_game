import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
import { LocalisedStringObject } from "../structs/Localisation"

const data: StaticEffectData = {
    id: 'SetAttack',
    name: {
        english: `Set Attack`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Set to 0 Attack.` } },
    activeSubtypes: 'hasAttack',
    effectObjs: [
        {
            operation: 'setAttack',
            value: 0,
        }
    ]
}

class SetAttack extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject, values: { attack: number, buffName?: LocalisedStringObject } = { attack: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.attack ?? 0
        moddedData.name = values.buffName ?? moddedData.name
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
export default SetAttack