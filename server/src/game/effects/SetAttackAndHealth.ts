import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"
import { LocalisedStringObject } from "../structs/Localisation"
import Character from "../gameObjects/Character"

const data: StaticEffectData = {
    id: 'SetAttackAndHealth',
    name: {
        english: `Set Attack and Health`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Set to $0. ($1 Health)` } },
    activeTypes: 'Character',
    effectObjs: [
        {
            operation: 'setAttack',
            value: 0,
        },
        {
            operation: 'incrementHealth',
            value: 0
        },
    ]
}

class SetAttackAndHealth extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject, values: { attack: number, health: number, buffName?: LocalisedStringObject } = { attack: 0, health: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.attack ?? 0
        const healthDif = (values.health ?? 0) - (owner as Character).healthStatic
        const sign = healthDif >= 0 ? '+' : ''
        moddedData.effectObjs[1].operation = healthDif >= 0 ? 'incrementHealth' : 'decrementHealth'
        moddedData.effectObjs[1].value = Math.abs(healthDif)
        moddedData.name = values.buffName ?? moddedData.name
        for (const localisation in moddedData.text.templates) {
            moddedData.text.templates[localisation] = moddedData.text.templates[localisation].replace(`$0`, `${moddedData.effectObjs[0].value}/${values.health ?? 0}`)
            moddedData.text.templates[localisation] = moddedData.text.templates[localisation].replace(`$1`, `${sign}${healthDif}`)
        }
        super(
            game,
            owner,
            moddedData
        )
    }
}
export default SetAttackAndHealth