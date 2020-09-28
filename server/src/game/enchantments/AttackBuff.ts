import StaticEnchantment, { StaticEnchantmentData } from "../gameObjects/StaticEnchantment"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"

const data: StaticEnchantmentData = {
    id: 'AttackBuff',
    name: {
        english: `Attack Buff`,
    },
    type: 'Enchantment',
    subtype: 'Static',
    activeZones: ['board', 'hand', 'deck', 'leaderZone'],
    activeTypes: ['Follower', 'Leader'],
    effectObjs: [
        {
            operation: 'incrementAttack',
            value: 0
        }
    ]
}

class AttackBuff extends StaticEnchantment {
    static readonly data: StaticEnchantmentData = data
    constructor(game: Game, owner: GameObject, values: { attack: number } = { attack: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.attack || 0
        super(
            game,
            owner,
            moddedData
        )
    }
}
export default AttackBuff