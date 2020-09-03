import LeaderTechnique from "./LeaderTechnique";

export interface ActiveLeaderTechniqueData {
    id: string
    name: string
    type: 'LeaderTechnique'
    subtype: 'Active'
    collectable: false
    cost: number
    staticCardText: string
    actions?: ActionActionObject[][]
    events?: EventActionObject[][]
    playRequirements?: ActiveRequirementObject[]
    enchantments?: EnchantmentIDString[]
    targeted: boolean
    targetDomain?: TargetsDomainString | TargetsDomainString[]
    targetRequirements?: TargetRequirementObject[]
    repeatable: boolean
}

abstract class ActiveLeaderTechnique extends LeaderTechnique {
    static readonly data: ActiveLeaderTechniqueData
    readonly data: ActiveLeaderTechniqueData
    subtype: 'Active'

    constructor(
        game: Game,
        owner: GamePlayer,
        data: ActiveLeaderTechniqueData
    ) {
        const { id, name, cost, staticCardText, targeted, repeatable } = data
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
            'Active',
            cost,
            staticCardText,
            actions,
            events,
            playRequirements,
            enchantments,
            targeted,
            targetDomain,
            targetRequirements,
            repeatable
        )
        this.data = data
    }
}

export default ActiveLeaderTechnique

import Game from "../gamePhases/Game";
import GamePlayer from "./GamePlayer";
import { ActionActionObject, EventActionObject } from "../structs/ActionObject";
import ActiveRequirementObject from "../structs/ActiveRequirementObject";
import { EnchantmentIDString } from "../stringTypes/DictionaryKeyString";
import { TargetsDomainString } from "../stringTypes/DomainString";
import TargetRequirementObject from "../structs/TargetRequirementObject";