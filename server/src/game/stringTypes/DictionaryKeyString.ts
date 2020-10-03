export type ActionOperationString = keyof typeof ActionOperations
export type ActiveRequirementString = keyof typeof ActiveRequirements

export type CardIDString = keyof typeof Cards

export type PersistentCardIDString = keyof typeof PersistentCards
export type DestroyableCardIDString = keyof typeof DestroyableCards

export type FollowerIDString = keyof typeof Followers
export type LeaderIDString = keyof typeof Leaders
export type MomentIDString = keyof typeof Moments
export type CreationIDString = keyof typeof Creations
export type PassiveIDString = keyof typeof Passives
export type LeaderTechniqueIDString = keyof typeof LeaderTechniques

export type NamelessFollowerIDString = keyof typeof NamelessFollowers
export type FamousFollowerIDString = keyof typeof FamousFollowers
export type ActionMomentString = keyof typeof ActionMoments
export type EventMomentString = keyof typeof EventMoments
export type WorkCreationIDString = keyof typeof WorkCreations
export type WeaponCreationIDString = keyof typeof WeaponCreations
export type WonderCreationIDString = keyof typeof WonderCreations
export type TechniqueCreationIDString = keyof typeof TechniqueCreations
export type PermanentPassiveIDString = keyof typeof PermanentPassives
export type EthosPassiveIDString = keyof typeof EthosPassives
export type ActiveLeaderTechniqueIDString = keyof typeof ActiveLeaderTechniques

export type DynamicOrStoredCardIDString = CardIDString | DynamicOrStoredStringObject
export type DynamicOrStoredPersistentCardIDString = PersistentCardIDString | DynamicOrStoredStringObject
export type DynamicOrStoredDestroyableCardIDString = DestroyableCardIDString | DynamicOrStoredStringObject
export type DynamicOrStoredFollowerIDString = FollowerIDString | DynamicOrStoredStringObject
export type DynamicOrStoredLeaderIDString = LeaderIDString | DynamicOrStoredStringObject
export type DynamicOrStoredCreationIDString = CreationIDString | DynamicOrStoredStringObject
export type DynamicOrStoredMomentIDString = MomentIDString | DynamicOrStoredStringObject
export type DynamicOrStoredPassiveIDString = PassiveIDString | DynamicOrStoredStringObject
export type DynamicOrStoredLeaderTechniqueIDString = LeaderTechniqueIDString | DynamicOrStoredStringObject

export type EffectIDString = keyof typeof Effects
export type CardEffectIDString = keyof typeof CardEffects
export type StatStaticEffectIDString = keyof typeof StatStaticEffects
export type StaticEffectIDString = keyof typeof StaticEffects
export type AuraEffectIDString = keyof typeof AuraEffects
export type TriggerEffectIDString = keyof typeof TriggerEffects
export type EffectExpiryIDString = keyof typeof EffectExpiries
// // export type DynamicOrStoredEffectIDString = EffectIDString | DynamicOrStoredStringObject

export type EffectOperationString = keyof typeof EffectOperations
export type EventModOperationString = keyof typeof EventModOperations
export type EventReducerString = keyof typeof DynamicEventReducers
export type EventRequirementString = keyof typeof EventRequirements
export type EventToTargetMapString = keyof typeof EventToTargetMaps
export type NumberOperatorString = keyof typeof DynamicNumberOperators
export type NumberReducerString = keyof typeof DynamicNumberReducers
export type NumberToBooleanMapString = keyof typeof NumberToBooleanMaps
export type PhaseString = keyof typeof Phases
export type TargetReducerString = keyof typeof DynamicTargetReducers
export type TargetRequirementString = keyof typeof TargetRequirements
export type TargetToNumberMapString = keyof typeof TargetToNumberMaps
export type TargetToStringMapString = keyof typeof TargetToStringMaps

import ActionOperations from "../dictionaries/ActionOperations"
import ActiveRequirements from "../dictionaries/ActiveRequirements"
import Cards, {
    Followers,
    NamelessFollowers,
    FamousFollowers,
    Leaders,
    ActionMoments,
    EventMoments,
    Moments,
    Creations,
    Passives,
    LeaderTechniques,
    WorkCreations,
    WeaponCreations,
    TechniqueCreations,
    PermanentPassives,
    EthosPassives,
    ActiveLeaderTechniques,
    PersistentCards,
    DestroyableCards,
    WonderCreations
} from "../dictionaries/Cards"
import { DynamicOrStoredStringObject } from "../structs/DynamicValueObject"
import EffectOperations from "../dictionaries/EffectOperations"
import Effects, { EffectExpiries, CardEffects, StaticEffects, AuraEffects, TriggerEffects, StatStaticEffects } from "../dictionaries/Effects"
import EventModOperations from "../dictionaries/EventModOperations"
import DynamicEventReducers from "../dictionaries/DynamicEventReducers"
import EventToTargetMaps from "../dictionaries/EventToTargetMaps"
import DynamicNumberReducers from "../dictionaries/DynamicNumberReducers"
import DynamicTargetReducers from "../dictionaries/DynamicTargetReducers"
import TargetRequirements from "../dictionaries/TargetRequirements"
import TargetToNumberMaps from "../dictionaries/TargetToNumberMaps"
import TargetToStringMaps from "../dictionaries/TargetToStringMaps"
import Phases from "../dictionaries/Phases"
import EventRequirements from "../dictionaries/EventRequirements"
import NumberToBooleanMaps from "../dictionaries/NumberToBooleanMaps"
import DynamicNumberOperators from "../dictionaries/DynamicNumberOperators"