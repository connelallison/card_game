import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
import { LocalisedStringObject } from "../structs/Localisation"
import Character from "../gameObjects/Character"

const data: StaticEffectData = {
    id: 'SetHealth',
    name: {
        english: `Set Health`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Set to $0 Health. ($1 Health)` } },
    stackable: false,
    activeTypes: 'Character',
    effectObjs: [
        {
            operation: 'incrementHealth',
            value: 0,
        }
    ]
}

class SetHealth extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject, values: { health: number, buffName?: LocalisedStringObject } = { health: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        const healthDif = GameObject.round((values.health ?? 0) - (owner as Character).healthStatic)
        const sign = healthDif >= 0 ? '+' : ''
        moddedData.effectObjs[0].operation = healthDif >= 0 ? 'incrementHealth' : 'decrementHealth'
        moddedData.effectObjs[0].value = Math.abs(healthDif)
        moddedData.name = values.buffName ?? moddedData.name
        for (const localisation in moddedData.text.templates) {
            moddedData.text.templates[localisation] = moddedData.text.templates[localisation].replace(`$0`, `${values.health ?? 0}`)
            moddedData.text.templates[localisation] = moddedData.text.templates[localisation].replace(`$1`, `${sign}${healthDif}`)
        }
        super(
            game,
            owner,
            moddedData
        )
    }
}
export default SetHealth