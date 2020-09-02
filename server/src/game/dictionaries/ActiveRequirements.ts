import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString"
import GameObject from "../gameObjects/GameObject"

const ActiveRequirements = {
    minFriendlyFollowers: (object: GameObject, values: {min: number}) => (object.controller().boardFollowers().length >= values.min),
    minEnemyFollowers: (object: GameObject, values: {min: number}) => (object.controller().opponent.boardFollowers().length >= values.min),
    minAllFollowers: (object: GameObject, values: {min: number}) => (object.controller().boardFollowers().length + object.controller().opponent.boardFollowers().length >= values.min),
    canSummonType: (object: GameObject, values: {type: string}) => (object.controller().canSummonType(values.type as PersistentCardTypeString)),
    isMyTurn: (object: GameObject) => (object.controller().myTurn())
}

export default ActiveRequirements