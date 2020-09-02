import GameObject from "../gameObjects/GameObject"
import DynamicTargets from "../functionTypes/DynamicTargets"

// const Reducers = {
//     max: (array: any[], map) => array.length === 0 ? array : [array.reduce((accumulator, val) => map(accumulator) < map(val) ? val : accumulator)],
//     min: (array: any[], map) => array.length === 0 ? array : [array.reduce((accumulator, val) => map(accumulator) > map(val) ? val : accumulator)],
//     first: (array: any[]) => array.length === 0 ? array : [array[0]],
//     last: (array: any[]) => array.length === 0 ? array : [array[array.length - 1]],
// }

const DynamicTargetReducers = {
    max: (targets: DynamicTargets, map) => (): GameObject[] => {
        const array = targets()
        return array.length === 0 ? array : [array.reduce((accumulator, val) => map(accumulator) < map(val) ? val : accumulator)]
        // return Reducers.max(targets(), map)
    },
    min: (targets: DynamicTargets, map) => (): GameObject[] => {
        const array = targets()
        return array.length === 0 ? array : [array.reduce((accumulator, val) => map(accumulator) > map(val) ? val : accumulator)]
        // return Reducers.min(targets(), map)
    },
    first: (targets: DynamicTargets) => (): GameObject[] => {
        const array = targets()
        return array.length === 0 ? array : [array[0]]
        // return Reducers.first(targets())
    },
    last: (targets: DynamicTargets) => (): GameObject[] => {
        const array = targets()
        return array.length === 0 ? array : [array[array.length - 1]]
        // return Reducers.last(targets())
    },
}

export default DynamicTargetReducers