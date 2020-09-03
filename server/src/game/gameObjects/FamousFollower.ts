import Follower from "./Follower";

export interface FamousFollowerData {
    id: string
    name: string
    type: 'Follower'
    subtype: 'Famous'
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

abstract class FamousFollower extends Follower {
    static readonly data: FamousFollowerData
    readonly data: FamousFollowerData
    subtype: 'Famous'

    constructor(
        game: Game,
        owner: GamePlayer,
        data: FamousFollowerData
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
            'Famous',
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
        this.data = FamousFollower.data
    }
}

export default FamousFollower

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import FollowerCategoryString from "../stringTypes/FollowerCategoryString";
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";