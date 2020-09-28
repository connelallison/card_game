import StaticEnchantment, { StaticEnchantmentData } from "../gameObjects/StaticEnchantment"
import Game from "../gamePhases/Game"
import GameObject from "../gameObjects/GameObject"

const data: StaticEnchantmentData = {
    id: 'Rent',
    name: {
        english: `Rent`,
    },
    type: 'Enchantment',
    subtype: 'Static',
    activeZones: ['board', 'hand', 'deck', 'leaderZone', 'creationZone', 'leaderTechniqueZone', 'passiveZone', 'setAsideZone', 'global'],
    activeTypes: ['Follower', 'Leader', 'Creation', 'LeaderTechnique', 'Moment', 'Passive', 'Player'],
    effectObjs: [
        {
            operation: 'incrementRent',
            value: 0
        }
    ]
}

class Rent extends StaticEnchantment {
    static readonly data: StaticEnchantmentData = data
    constructor(game: Game, owner: GameObject, values: { statValue: number } = { statValue: 0 }) {
        const moddedData = JSON.parse(JSON.stringify(data))
        moddedData.effectObjs[0].value = values.statValue || 0
        super(
            game,
            owner,
            moddedData
        )
    }
}
export default Rent