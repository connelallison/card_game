const TargetRequirements = {
    minVal: (source: GameObject, target: GameObject, values: { min: number, param: string }): boolean => (target[values.param] >= values.min),
    maxVal: (source: GameObject, target: GameObject, values: { max: number, param: string }): boolean => (target[values.param] <= values.max),
    isFriendly: (source: GameObject, target: GameObject): boolean => (source.controller() === target.controller()),
    isEnemy: (source: GameObject, target: GameObject): boolean => (source.controller() !== target.controller()),
    isSelf: (source: GameObject, target: GameObject): boolean => (source.charOwner() === target),
    isNotSelf: (source: GameObject, target: GameObject): boolean => (source.charOwner() !== target),
    isSpecificCardClass: (source: GameObject, target: GameObject, values: { cardID: string }): boolean => (target.id === values.cardID),
    isNotSpecificCardClass: (source: GameObject, target: GameObject, values: { cardID: string }): boolean => (target.id !== values.cardID),
    isType: (source: GameObject, target: GameObject, values: { type: string }): boolean => (target.type === values.type),
    isTypes: (source: GameObject, target: GameObject, values: { types: string[] }): boolean => (values.types.includes(target.type)),
    isNotType: (source: GameObject, target: GameObject, values: { type: string }): boolean => (target.type !== values.type),
    isNotTypes: (source: GameObject, target: GameObject, values: { types: string[] }): boolean => (!values.types.includes(target.type)),
    isSubtype: (source: GameObject, target: GameObject, values: { subtype: string }): boolean => (target.subtype === values.subtype),
    isSubtypes: (source: GameObject, target: GameObject, values: { subtypes: string[] }): boolean => (values.subtypes.includes(target.subtype)),
    isNotSubtype: (source: GameObject, target: GameObject, values: { subtype: string }): boolean => (target.subtype !== values.subtype),
    isNotSubtypes: (source: GameObject, target: GameObject, values: { subtypes: string[] }): boolean => (!values.subtypes.includes(target.subtype)),
    isCategory: (source: GameObject, target: GameObject, values: { category: FollowerCategoryString }): boolean => ((target as Follower).categories?.includes(values.category)),
    isCategories: (source: GameObject, target: GameObject, values: { categories: FollowerCategoryString[] }): boolean => ((target as Follower).categories?.some(category => values.categories.includes(category))),
    isNotCategory: (source: GameObject, target: GameObject, values: { category: FollowerCategoryString }): boolean => (!(target as Follower).categories?.includes(values.category)),
    isNotCategories: (source: GameObject, target: GameObject, values: { categories: FollowerCategoryString[] }): boolean => (!(target as Follower).categories?.some(category => values.categories.includes(category))),
    isDynamicTarget: (source: GameObject, target: GameObject, values: { dynamicTarget: GameObject[] }): boolean => (target === values.dynamicTarget[0]),
    isNotDynamicTarget: (source: GameObject, target: GameObject, values: { dynamicTarget: GameObject[] }): boolean => (target !== values.dynamicTarget[0]),
    inZone: (source: GameObject, target: GameObject, values: { zone: string }): boolean => (target.zone === values.zone),
    notInZone: (source: GameObject, target: GameObject, values: { zone: string }): boolean => (target.zone !== values.zone),
    ready: (source: GameObject, target: GameObject): boolean => ((target as Character).ready ?? false),
    notReady: (source: GameObject, target: GameObject): boolean => (((target as Character).ready ?? true) === false),
    hasAttack: (source: GameObject, target: GameObject): boolean => ((target as Character).hasAttack()),
    notHasAttack: (source: GameObject, target: GameObject): boolean => (!(target as Character).hasAttack()),
    isOwnersTurn: (source: GameObject, target: GameObject): boolean => (target.controller().myTurn()),
    isNotOwnersTurn: (source: GameObject, target: GameObject): boolean => (!target.controller().myTurn()),
    isDestroyed: (source: GameObject, target: GameObject): boolean => ((target as DestroyableCard).isDestroyed()),
    isNotDestroyed: (source: GameObject, target: GameObject): boolean => (!(target as DestroyableCard).isDestroyed()),
    hasOpposite: (source: GameObject, target: GameObject): boolean => (!!(target as Follower).oppositeFollower?.()),
    notHasOpposite: (source: GameObject, target: GameObject): boolean => (!((target as Follower).oppositeFollower?.() ?? true)),
}

export default TargetRequirements

import Character from "../gameObjects/Character"
import DestroyableCard from "../gameObjects/DestroyableCard"
import Follower from "../gameObjects/Follower"
import GameObject from "../gameObjects/GameObject"
import FollowerCategoryString from "../stringTypes/FollowerCategoryString"
