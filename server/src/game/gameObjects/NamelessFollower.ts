import Follower from "./Follower";

export interface NamelessFollowerData {
    id: string
    name: string
    type: 'Follower'
    subtype: 'Nameless'
    categories: FollowerCategoryString[]
    collectable: boolean
    cost: number
    attack: number
    health: number
    staticCardText: string
    actions?: ActionActionObject[][]
    events?: EventActionObject[][]
    playRequirements?: ActiveRequirementObject[]
    enchantments?: EnchantmentIDString[]
    targeted: boolean
    targetDomain?: TargetsDomainString | TargetsDomainString[]
    targetRequirements?: TargetRequirementObject[]
}

abstract class NamelessFollower extends Follower {
    static readonly data: NamelessFollowerData
    readonly data: NamelessFollowerData
    subtype: 'Nameless'

    constructor(
        game: Game,
        owner: GamePlayer,
        data: NamelessFollowerData
    ) {
        const { id, name, cost, attack, health, categories, collectable, staticCardText, targeted} = data
        const targetDomain = data.targetDomain || []
        const targetRequirements = data.targetRequirements || []
        const actions = data.actions || []
        const events = data.events || []
        const enchantments = data.enchantments || []
        const playRequirements = data.playRequirements || []
        super(
            game,
            owner,
            id,
            name,
            'Nameless',
            categories,
            collectable,
            cost,
            attack,
            health,
            staticCardText,
            actions,
            events, 
            playRequirements,
            enchantments,
            targeted,
            targetDomain,
            targetRequirements
        )
        this.data = data
    }
}

export default NamelessFollower

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import FollowerCategoryString from "../stringTypes/FollowerCategoryString";
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";