import TargetRequirement from "../functionTypes/TargetRequirement"
import GameObject from "../gameObjects/GameObject"
import TargetDomains from "./TargetDomains"
import TargetDomainString from "../stringTypes/TargetDomainString"
import DynamicTargetsObject from "../structs/DynamicTargetsObject"

const Reducers = {
    count: (array: any[]) => array.reduce(accumulator => accumulator + 1, 0),
    sum: (array: any[], map) => array.map(obj => map(obj)).reduce((accumulator, val) => accumulator + val, 0),
    max: (array: any[], map) => array.length === 0 ? null : array.map(obj => map(obj)).reduce((accumulator, val) => accumulator < val ? val : accumulator),
    min: (array: any[], map) => array.length === 0 ? null : array.map(obj => map(obj)).reduce((accumulator, val) => accumulator > val ? val : accumulator),
}

const DynamicNumberReducers = {
    count: (targets) => (): number => {
        // const targets = TargetDomains(object, targetsObj.domain)()
        // const filtered = targetsObj.requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(object, target))), targets)
        return Reducers.count(targets())
    },
    sum: (targets, map) => (): number => {
        // const targets = TargetDomains(object, targetsObj.domain)()
        // const filtered = targetsObj.requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(object, target))), targets)
        return Reducers.sum(targets(), map)
    },
    max: (targets, map) => (): number => {
        // const targets = TargetDomains(object, targetsObj.domain)()
        // const filtered = targetsObj.requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(object, target))), targets)
        return Reducers.max(targets(), map)
    },
    min: (targets, map) => (): number => {
        // const targets = TargetDomains(object, targetsObj.domain)()
        // const filtered = targetsObj.requirements.reduce((filtered, targetFilter) => (filtered.filter(target => targetFilter(object, target))), targets)
        return Reducers.min(targets(), map)
    },
}

export default DynamicNumberReducers