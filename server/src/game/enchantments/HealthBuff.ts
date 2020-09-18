import StaticEnchantment, { StaticEnchantmentData } from "../gameObjects/StaticEnchantment"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"

const data: StaticEnchantmentData = {
    id: 'HealthBuff',
    name: {
        english: `Health Buff`,
    },
    type: 'Enchantment',
    subtype: 'Static',
    activeZones: ['board', 'hand', 'deck', 'leaderZone'],
    activeTypes: ['Follower', 'Leader'],
    effectObjs: [
        {
            operation: 'incrementHealth',
            value: 0
        }
    ]
}

class HealthBuff extends StaticEnchantment {
    static readonly data: StaticEnchantmentData = data
    constructor(game: Game, owner: GameObject, values: { health: number } = { health: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.health || 0
        super(
            game,
            owner,
            moddedData
        )
    }
}
export default HealthBuff