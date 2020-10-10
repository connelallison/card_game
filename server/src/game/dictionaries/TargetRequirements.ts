const TargetRequirements = {
    minVal: (source: GameObject, target: GameObject, values: { min: number, param: string }): boolean => (target[values.param] >= values.min),
    maxVal: (source: GameObject, target: GameObject, values: { max: number, param: string }): boolean => (target[values.param] <= values.max),
    isFriendly: (source: GameObject, target: GameObject): boolean => (source.controller() === target.controller()),
    isEnemy: (source: GameObject, target: GameObject): boolean => (source.controller() !== target.controller()),
    notSelf: (source: GameObject, target: GameObject): boolean => (source.charOwner() !== target),
    isSelf: (source: GameObject, target: GameObject): boolean => (source.charOwner() === target),
    isSpecificCardClass: (source: GameObject, target: GameObject, values: { cardID: string }): boolean => (target.id === values.cardID),
    isNotSpecificCardClass: (source: GameObject, target: GameObject, values: { cardID: string }): boolean => (target.id !== values.cardID),
    isType: (source: GameObject, target: GameObject, values: { type: string }): boolean => (target.type === values.type),
    isNotType: (source: GameObject, target: GameObject, values: { type: string }): boolean => (target.type !== values.type),
    isSubtype: (source: GameObject, target: GameObject, values: { subtype: string }): boolean => (target.subtype === values.subtype),
    isNotSubtype: (source: GameObject, target: GameObject, values: { subtype: string }): boolean => (target.subtype !== values.subtype),
    isCategory: (source: GameObject, target: GameObject, values: { category: FollowerCategoryString }): boolean => ((target as Follower).categories.includes(values.category)),
    isNotCategory: (source: GameObject, target: GameObject, values: { category: FollowerCategoryString }): boolean => (!(target as Follower).categories.includes(values.category)),
    isDynamicTarget: (source: GameObject, target: GameObject, values: { dynamicTarget: GameObject[] }): boolean => (target === values.dynamicTarget[0]),
    isNotDynamicTarget: (source: GameObject, target: GameObject, values: { dynamicTarget: GameObject[] }): boolean => (target !== values.dynamicTarget[0]),
    inZone: (source: GameObject, target: GameObject, values: { zone: string }): boolean => (target.zone === values.zone),
    notInZone: (source: GameObject, target: GameObject, values: { zone: string }): boolean => (target.zone !== values.zone),
}

export default TargetRequirements

import Follower from "../gameObjects/Follower"
import GameObject from "../gameObjects/GameObject"
import FollowerCategoryString from "../stringTypes/FollowerCategoryString"
