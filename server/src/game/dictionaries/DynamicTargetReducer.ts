import TargetRequirement from "../functionTypes/TargetRequirement"
import GameObject from "../gameObjects/GameObject"
import TargetDomains from "./TargetDomains"
import TargetDomainString from "../stringTypes/TargetDomainString"
import DynamicTargetsObject from "../structs/DynamicTargetsObject"

const Reducers = {
    max: (array: any[], map) => array.length === 0 ? array : [array.reduce((accumulator, val) => map(accumulator) < map(val) ? val : accumulator)],
    min: (array: any[], map) => array.length === 0 ? array : [array.reduce((accumulator, val) => map(accumulator) > map(val) ? val : accumulator)],
    first: (array: any[]) => array.length === 0 ? array : [array[0]],
    last: (array: any[]) => array.length === 0 ? array : [array[array.length - 1]],
}

const DynamicTargetReducers = {
    max: (targets, map) => () => {
        // const targets = TargetDomains(object, targetsObj.domain)()
        // const filtered = targetsObj.requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(object, target))), targets)
        return Reducers.max(targets(), map)
    },
    min: (targets, map) => () => {
        // const targets = TargetDomains(object, targetsObj.domain)()
        // const filtered = targetsObj.requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(object, target))), targets)
        return Reducers.min(targets(), map)
    },
    first: (targets) => () => {
        // const targets = TargetDomains(object, targetsObj.domain)()
        // const filtered = targetsObj.requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(object, target))), targets)
        return Reducers.first(targets())
    },
    last: (targets) => () => {
        // const targets = TargetDomains(object, targetsObj.domain)()
        // const filtered = targetsObj.requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(object, target))), targets)
        return Reducers.last(targets())
    },
}

export default DynamicTargetReducers