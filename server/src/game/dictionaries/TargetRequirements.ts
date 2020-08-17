const TargetRequirements: {[index: string]: TargetRequirementFactory} = {
    minVal: (source: GameObject, values: {minVal: DynamicNumber, param: DynamicString}) => (target: Character) => (target[values.param()] >= values.minVal()),
    maxVal: (source: GameObject, values: {maxVal: DynamicNumber, param: DynamicString}) => (target: Character) => (target[values.param()] <= values.maxVal()),
    isFriendly: (source: GameObject) => (target: Character) => (source.controller() === target.controller()),
    isEnemy: (source: GameObject) => (target: Character) => (source.controller() !== target.controller()),
    notSelf: (source: GameObject) => (target: Character) => (source.charOwner() !== target),
    isSelf: (source: GameObject) => (target: Character) => (source.charOwner() === target),
    isSpecificCardClass: (source: GameObject, values: {cardID: DynamicString}) => (target: Character) => (target.id === values.cardID()),
    isNotSpecificCardClass: (source: GameObject, values: {cardID: DynamicString}) => (target: Character) => (target.id !== values.cardID()),
    isType: (source: GameObject, values: {type: DynamicString}) => (target: Character) => (target.type === values.type()),
    isNotType: (source: GameObject, values: {type: DynamicString}) => (target: Character) => (target.type !== values.type()),
    isDynamicTarget: (source: GameObject, values: {dynamicTarget: DynamicTarget}) => (target: Character) => (target === values.dynamicTarget()[0]),
    isNotDynamicTarget: (source: GameObject, values: {dynamicTarget: DynamicTarget}) => (target: Character) => (target !== values.dynamicTarget()[0]),
    inZone: (source: GameObject, values: {zone: DynamicString}) => (target: Character) => (target.zone === values.zone()),
    notInZone: (source: GameObject, values: {zone: DynamicString}) => (target: Character) => (target.zone !== values.zone()),
}

export default TargetRequirements

import GameObject from "../gameObjects/GameObject"
import Character from "../gameObjects/Character"
import TargetRequirementFactory from "../functionTypes/TargetRequirementFactory"
import DynamicTarget from "../functionTypes/DynamicTarget"
import DynamicNumber from "../functionTypes/DynamicNumber"
import DynamicString from "../functionTypes/DynamicString"