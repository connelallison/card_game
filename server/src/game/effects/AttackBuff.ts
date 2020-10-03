import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"

const data: StaticEffectData = {
    id: 'AttackBuff',
    name: {
        english: `Attack Buff`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `+0 Attack` } },
    activeZones: ['board', 'hand', 'deck', 'leaderZone'],
    activeTypes: ['Follower', 'Leader'],
    effectObjs: [
        {
            operation: 'incrementAttack',
            value: 0
        }
    ]
}

class AttackBuff extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject, values: { attack: number } = { attack: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.attack || 0
        for (const localisation in moddedData.text.templates) {
            moddedData.text.templates[localisation] = moddedData.text.templates[localisation].replace(`+0`, `+${moddedData.effectObjs[0].value}`)
        }
        // moddedData.text = moddedData.text.replace(`+0`, `+${moddedData.effectObjs[0].value}`)
        super(
            game,
            owner,
            moddedData
        )
    }
}
export default AttackBuff