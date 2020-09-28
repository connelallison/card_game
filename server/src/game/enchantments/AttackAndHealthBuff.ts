import StaticEnchantment, { StaticEnchantmentData } from "../gameObjects/StaticEnchantment"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"

const data: StaticEnchantmentData = {
    id: 'AttackAndHealthBuff',
    name: {
        english: `Attack and Health Buff`,
    },
    type: 'Enchantment',
    subtype: 'Static',
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

class AttackAndHealthBuff extends StaticEnchantment {
    static readonly data: StaticEnchantmentData = data
    constructor(game: Game, owner: GameObject, values: { attack: number, health: number } = { attack: 0, health: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.attack || 0
        moddedData.effectObjs[1].value = values.health || 0
        super(
            game,
            owner,
            moddedData
        )
    }
}
export default AttackAndHealthBuff