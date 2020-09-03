const ActiveRequirements = {
    minFriendlyFollowers: (object: GameObject, values: {min: number}) => (object.controller().boardFollowers().length >= values.min),
    min1FriendlyFollower: (object: GameObject) => (object.controller().boardFollowers().length >= 1),
    minEnemyFollowers: (object: GameObject, values: {min: number}) => (object.controller().opponent.boardFollowers().length >= values.min),
    min1EnemyFollower: (object: GameObject) => (object.controller().opponent.boardFollowers().length >= 1),
    minAllFollowers: (object: GameObject, values: {min: number}) => (object.controller().boardFollowers().length + object.controller().opponent.boardFollowers().length >= values.min),
    min1AllFollower: (object: GameObject) => (object.controller().boardFollowers().length + object.controller().opponent.boardFollowers().length >= 1),
    canSummonType: (object: GameObject, values: {type: string}) => (object.controller().canSummonType(values.type as PersistentCardTypeString)),
    isMyTurn: (object: GameObject) => (object.controller().myTurn())
}

export default ActiveRequirements

import GameObject from "../gameObjects/GameObject"
import { PersistentCardTypeString } from "../stringTypes/ObjectTypeString"