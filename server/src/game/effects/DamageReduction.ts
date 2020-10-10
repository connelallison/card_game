import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"

const data: StaticEffectData = {
    id: 'DamageReduction',
    name: {
        english: `Damage Reduction`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `This takes 0 less damage from all sources.` } },
    activeTypes: 'Character',
    effectObjs: [
        {
            operation: 'incrementDamageReduction',
            value: 0
        }
    ]
}

class DamageReduction extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject, values: { statValue: number } = { statValue: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.statValue || 0
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
export default DamageReduction