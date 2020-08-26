import PlayRequirementFactory from "../functionTypes/PlayRequirementFactory"
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString"
import DynamicNumber from "../functionTypes/DynamicNumber"
import DynamicString from "../functionTypes/DynamicString"
import GameObject from "../gameObjects/GameObject"

const PlayRequirements: {[index: string]: PlayRequirementFactory} = {
    minFriendlyFollowers: (object: GameObject, values: {min: DynamicNumber}) => () => (object.controller().boardFollowers().length >= values.min()),
    minEnemyFollowers: (object: GameObject, values: {min: DynamicNumber}) => () => (object.controller().opponent.boardFollowers().length >= values.min()),
    minAllFollowers: (object: GameObject, values: {min: DynamicNumber}) => () => (object.controller().boardFollowers().length + object.controller().opponent.boardFollowers().length >= values.min()),
    canSummonType: (object: GameObject, values: {type: DynamicString}) => () => { return object.controller().canSummonType(values.type() as PersistentCardTypeString)},
    isMyTurn: (object: GameObject) => () => (object.controller().myTurn())
}

export default PlayRequirements