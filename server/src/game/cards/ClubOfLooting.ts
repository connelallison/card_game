import WeaponCreation, { WeaponCreationData } from "../gameObjects/WeaponCreation";
import Game from "../gamePhases/Game";
import GamePlayer from "../gameObjects/GamePlayer";

const data: WeaponCreationData = {
    id: 'ClubOfLooting',
    name: {
        english: `Club of Looting`,
    },
    type: 'Creation',
    subtype: 'Weapon',
    classes: ['Empire'],
    collectable: true,
    cost: 2,
    attack: 3,
    charges: 3,
    staticText: {
        english: `Your Leader has Pillage.`,
    },
    text: {
        templates: {
            english: `Your Leader has Pillage.`,
        },
    },
    enchantments: ['Pillage'],
}

class ClubOfLooting extends WeaponCreation {
    static readonly data: WeaponCreationData = data
    constructor(game: Game, owner: GamePlayer) {
        super(game, owner, data)
    }
}
export default ClubOfLooting