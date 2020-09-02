import GameEvent from "../gameEvents/GameEvent"
import DynamicEvents from "../functionTypes/DynamicEvents"

// const Reducers = {
//     // max: (array: any[], map) => array.length === 0 ? array : [array.reduce((accumulator, val) => map(accumulator) < map(val) ? val : accumulator)],
//     // min: (array: any[], map) => array.length === 0 ? array : [array.reduce((accumulator, val) => map(accumulator) > map(val) ? val : accumulator)],
// }

const DynamicEventReducers = {
    // max: (targets, map) => () => {
    //     // const targets = TargetDomains(object, targetsObj.domain)()
    //     // const filtered = targetsObj.requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(object, target))), targets)
    //     return Reducers.max(targets(), map)
    // },
    // min: (targets, map) => () => {
    //     // const targets = TargetDomains(object, targetsObj.domain)()
    //     // const filtered = targetsObj.requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(object, target))), targets)
    //     return Reducers.min(targets(), map)
    // },
    first: (events: DynamicEvents) => (): GameEvent[] => {
        const array = events()
        return array.length === 0 ? array : [array[0]]
    },
    last: (events: DynamicEvents) => (): GameEvent[] => {
        const array = events()
        return array.length === 0 ? array : [array[array.length - 1]]
    },
}

export default DynamicEventReducers