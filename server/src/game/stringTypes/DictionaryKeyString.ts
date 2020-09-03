export type ActionOperationString = keyof typeof ActionOperations
export type ActiveRequirementString = keyof typeof ActiveRequirements
export type CardIDString = keyof typeof Cards
export type DynamicCardIDString = CardIDString | DynamicStringObject
export type EffectOperationString = keyof typeof EffectOperations
export type EnchantmentIDString = keyof typeof Enchantments
export type EventModOperationString = keyof typeof EventModOperations
export type EventReducerString = keyof typeof DynamicEventReducers
export type EventToTargetMapString = keyof typeof EventToTargetMaps
// export type NumberOperatorString = keyof typeof DynamicNumberOperators
export type NumberReducerString = keyof typeof DynamicNumberReducers
export type TargetReducerString = keyof typeof DynamicTargetReducers
export type TargetRequirementString = keyof typeof TargetRequirements
export type TargetToNumberMapString = keyof typeof TargetToNumberMaps
export type TargetToStringMapString = keyof typeof TargetToStringMaps

import ActionOperations from "../dictionaries/ActionOperations"
import ActiveRequirements from "../dictionaries/ActiveRequirements"
import Cards from "../dictionaries/Cards"
import { DynamicStringObject } from "../structs/DynamicValueObject"
import EffectOperations from "../dictionaries/EffectOperations"
import Enchantments from "../dictionaries/Enchantments"
import EventModOperations from "../dictionaries/EventModOperations"
import DynamicEventReducers from "../dictionaries/DynamicEventReducers"
import EventToTargetMaps from "../dictionaries/EventToTargetMaps"
import DynamicNumberReducers from "../dictionaries/DynamicNumberReducers"
import DynamicTargetReducers from "../dictionaries/DynamicTargetReducers"
import TargetRequirements from "../dictionaries/TargetRequirements"
import TargetToNumberMaps from "../dictionaries/TargetToNumberMaps"
import TargetToStringMaps from "../dictionaries/TargetToStringMaps"