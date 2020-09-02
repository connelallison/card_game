import GameObject from "../gameObjects/GameObject"
import DynamicTargets from "../functionTypes/DynamicTargets"
import TargetToNumberMap from "../functionTypes/TargetToNumberMap"

// const Reducers = {
//     max: (array: any[], map) => array.length === 0 ? array : [array.reduce((accumulator, val) => map(accumulator) < map(val) ? val : accumulator)],
//     min: (array: any[], map) => array.length === 0 ? array : [array.reduce((accumulator, val) => map(accumulator) > map(val) ? val : accumulator)],
//     first: (array: any[]) => array.length === 0 ? array : [array[0]],
//     last: (array: any[]) => array.length === 0 ? array : [array[array.length - 1]],
// }

const DynamicTargetReducers = {
    max: (targets: GameObject[], map: TargetToNumberMap) => (targets.length === 0 ? targets : [targets.reduce((accumulator, val) => map(accumulator) < map(val) ? val : accumulator)]),
    min: (targets: GameObject[], map: TargetToNumberMap) => (targets.length === 0 ? targets : [targets.reduce((accumulator, val) => map(accumulator) > map(val) ? val : accumulator)]),
    first: (targets: GameObject[]) => (targets.length === 0 ? targets : [targets[0]]),
    last: (targets: GameObject[]) => (targets.length === 0 ? targets : [targets[targets.length - 1]]),
}

export default DynamicTargetReducers