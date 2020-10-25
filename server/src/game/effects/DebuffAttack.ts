import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
import { LocalisedStringObject } from "../structs/Localisation"

const data: StaticEffectData = {
    id: 'DebuffAttack',
    name: {
        english: `Attack Debuff`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `-0 Attack` } },
    stackable: true,
    activeSubtypes: 'hasAttack',
    effectObjs: [
        {
            operation: 'decrementAttack',
            value: 0
        }
    ]
}

class DebuffAttack extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject, values: { attack: number, effectName?: LocalisedStringObject } = { attack: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.attack ?? 0
        moddedData.name = values.effectName ?? moddedData.name
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
export default DebuffAttack