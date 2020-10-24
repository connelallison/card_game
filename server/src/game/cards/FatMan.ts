import WeaponCreation, { WeaponCreationData } from "../gameObjects/WeaponCreation";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WeaponCreationData = {
    id: 'FatMan',
    name: {
        english: `Fat Man`,
    },
    type: 'Creation',
    subtype: 'Weapon',
    classes: ['Infamy'],
    collectable: true,
    cost: 5,
    attack: 5,
    charges: 2,
    staticText: {
        english: `Rot\nCollateral`,
    },
    text: {
        templates: {
            english: `Rot\nCollateral`,
        },
    },
    effects: ['Rot', 'Collateral'],
}

class FatMan extends WeaponCreation {
    static readonly data: WeaponCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default FatMan