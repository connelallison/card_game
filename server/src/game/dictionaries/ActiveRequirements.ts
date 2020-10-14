const ActiveRequirements = {
    minFriendlyFollowers: (object: GameObject, values: {min: number}) => (object.controller().boardFollowers().length >= values.min),
    min1FriendlyFollower: (object: GameObject) => (object.controller().boardFollowers().length >= 1),
    minEnemyFollowers: (object: GameObject, values: {min: number}) => (object.opponent().boardFollowers().length >= values.min),
    min1EnemyFollower: (object: GameObject) => (object.opponent().boardFollowers().length >= 1),
    minAllFollowers: (object: GameObject, values: {min: number}) => (object.controller().boardFollowers().length + object.opponent().boardFollowers().length >= values.min),
    min1AllFollower: (object: GameObject) => (object.controller().boardFollowers().length + object.opponent().boardFollowers().length >= 1),
    canSummonType: (object: GameObject, values: {type: string}) => (object.controller().canSummonType(values.type as PersistentCardTypeString)),
    isMyTurn: (object: GameObject) => (object.controller().myTurn()),
    isNotMyTurn: (object: GameObject) => (!object.controller().myTurn()),
    eureka: (object: GameObject) => ((object.effectOwner() as Card).eureka?.() ?? false),
    notEureka: (object: GameObject) => ((object.effectOwner() as Card).eureka?.() === false ?? false),
    canAfford: (object: GameObject, values: {cost: number}) => (object.controller().money >= values.cost),
    charOwnerAlive: (object: GameObject) => (!object.charOwner().isDestroyed())
}

export default ActiveRequirements

import Card from "../gameObjects/Card"
import GameObject from "../gameObjects/GameObject"
import { PersistentCardTypeString } from "../stringTypes/ZoneTypeSubtypeString"