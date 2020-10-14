import StaticEffect, { StaticEffectData } from "../gameObjects/StaticEffect"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"

const data: StaticEffectData = {
    id: 'Rent',
    name: {
        english: `Rent`,
    },
    type: 'Effect',
    subtype: 'Static',
    text: { templates: { english: `Rent 0` } },
    stackable: true,
    activeTypes: 'Persistent',
    effectObjs: [
        {
            operation: 'incrementRent',
            value: 0
        }
    ]
}

class Rent extends StaticEffect {
    static readonly data: StaticEffectData = data
    constructor(game: Game, owner: GameObject, values: { statValue: number } = { statValue: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.statValue || 0
        for (const localisation in moddedData.text.templates) {
            moddedData.text.templates[localisation] = moddedData.text.templates[localisation].replace(`0`, `${moddedData.effectObjs[0].value}`)
        }
        // moddedData.text = moddedData.text.replace(`0`, `${moddedData.effectObjs[0].value}`)
        super(
            game,
            owner,
            moddedData
        )
    }
}
export default Rent