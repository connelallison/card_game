import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"

const data: StaticEffectData = {
    id: 'AttackAndHealthBuff',
    name: {
        english: `Attack and Health Buff`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `+0/+0` } },
    activeZones: ['board', 'hand', 'deck', 'leaderZone'],
    activeTypes: ['Follower', 'Leader'],
    effectObjs: [
        {
            operation: 'incrementAttack',
            value: 0
        },
        {
            operation: 'incrementHealth',
            value: 0
        }
    ]
}

class AttackAndHealthBuff extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject, values: { attack: number, health: number } = { attack: 0, health: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.attack || 0
        moddedData.effectObjs[1].value = values.health || 0
        for (const localisation in moddedData.text.templates) {
            moddedData.text.templates[localisation] = moddedData.text.templates[localisation].replace(`+0/+0`, `+${moddedData.effectObjs[0].value}/+${moddedData.effectObjs[1].value}`)
        }
        // moddedData.text = moddedData.text.replace(`+0/+0`, `+${moddedData.effectObjs[0].value}/+${moddedData.effectObjs[1].value}`)
        super(
            game,
            owner,
            moddedData
        )
    }
}
export default AttackAndHealthBuff