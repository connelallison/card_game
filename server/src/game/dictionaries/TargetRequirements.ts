const TargetRequirements = {
    minVal: (source: GameObject, target: GameObject, values: {min: number, param: string}) => (target[values.param] >= values.min),
    maxVal: (source: GameObject, target: GameObject, values: {max: number, param: string}) => (target[values.param] <= values.max),
    isFriendly: (source: GameObject, target: GameObject) => (source.controller() === target.controller()),
    isEnemy: (source: GameObject, target: GameObject) => (source.controller() !== target.controller()),
    notSelf: (source: GameObject, target: GameObject) => (source.charOwner() !== target),
    isSelf: (source: GameObject, target: GameObject) => (source.charOwner() === target),
    isSpecificCardClass: (source: GameObject, target: GameObject, values: {cardID: string}) => (target.id === values.cardID),
    isNotSpecificCardClass: (source: GameObject, target: GameObject, values: {cardID: string}) => (target.id !== values.cardID),
    isType: (source: GameObject, target: GameObject, values: {type: string}) => (target.type === values.type),
    isNotType: (source: GameObject, target: GameObject, values: {type: string}) => (target.type !== values.type),
    isDynamicTarget: (source: GameObject, target: GameObject, values: {dynamicTarget: GameObject[]}) => (target === values.dynamicTarget[0]),
    isNotDynamicTarget: (source: GameObject, target: GameObject, values: {dynamicTarget: GameObject[]}) => (target !== values.dynamicTarget[0]),
    inZone: (source: GameObject, target: GameObject, values: {zone: string}) => (target.zone === values.zone),
    notInZone: (source: GameObject, target: GameObject, values: {zone: string}) => (target.zone !== values.zone),
}

export default TargetRequirements

import GameObject from "../gameObjects/GameObject"