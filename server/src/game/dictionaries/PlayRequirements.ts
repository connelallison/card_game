import PlayRequirementFactory from "../functionTypes/PlayRequirementFactory"
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString"
import DynamicNumber from "../functionTypes/DynamicNumber"
import DynamicString from "../functionTypes/DynamicString"
import GameObject from "../gameObjects/GameObject"

const PlayRequirements: {[index: string]: PlayRequirementFactory} = {
    minFriendlyUnits: (object: GameObject, values: {min: DynamicNumber}) => () => (object.controller().board.length >= values.min()),
    minEnemyUnits: (object: GameObject, values: {min: DynamicNumber}) => () => (object.controller().opponent.board.length >= values.min()),
    minAllUnits: (object: GameObject, values: {min: DynamicNumber}) => () => (object.controller().board.length + object.controller().opponent.board.length >= values.min()),
    canSummonType: (object: GameObject, values: {type: DynamicString}) => () => { return object.controller().canSummonType(values.type() as PersistentCardTypeString)},
    isMyTurn: (object: GameObject) => () => (object.controller().myTurn())
}

export default PlayRequirements