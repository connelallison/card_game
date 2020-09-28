import StaticEnchantment, { StaticEnchantmentData } from "../gameObjects/StaticEnchantment";
import Game from "../gamePhases/Game";
import GameObject from "../gameObjects/GameObject";

const data: StaticEnchantmentData = {
    id: 'Pillage',
    name: {
        english: `Pillage`,
    },
    type: 'Enchantment',
    subtype: 'Static',
    activeZones: ['board', 'leaderZone', 'creationZone', 'leaderTechniqueZone', 'passiveZone'],
    activeTypes: ['Follower', 'Creation', 'Leader', 'LeaderTechnique', 'Moment'],
    effectObjs: [{
        operation: 'pillage',
        value: true
    }]
}

class Pillage extends StaticEnchantment {
    static readonly data: StaticEnchantmentData = data
    constructor(game: Game, owner: GameObject) {
        super(game, owner, data)
    }
}
export default Pillage