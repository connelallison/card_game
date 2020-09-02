import TargetRequirement from "../functionTypes/TargetRequirement"
import GameObject from "../gameObjects/GameObject"
import TargetDomains from "./TargetDomains"
import TargetsDomainString from "../stringTypes/TargetsDomainString"
import DynamicTargetsObject from "../structs/DynamicTargetsObject"
import DynamicNumbers from "../functionTypes/DynamicNumbers"

// const Reducers = {
//     count: (array: number[]) => array.reduce(accumulator => accumulator + 1, 0),
//     sum: (array: number[], map) => array.map(obj => map(obj)).reduce((accumulator, val) => accumulator + val, 0),
//     max: (array: number[], map) => array.length === 0 ? null : array.map(obj => map(obj)).reduce((accumulator, val) => accumulator < val ? val : accumulator),
//     min: (array: number[], map) => array.length === 0 ? null : array.map(obj => map(obj)).reduce((accumulator, val) => accumulator > val ? val : accumulator),
// }

const DynamicNumberReducers = {
    count: (numbers: DynamicNumbers) => (): number => {
        const array = numbers()
        return array.reduce(accumulator => accumulator + 1, 0)
        // return Reducers.count(numbers())
    },
    sum: (numbers: DynamicNumbers) => (): number => {
        const array = numbers()
        return array.reduce((accumulator, val) => accumulator + val, 0)
        // return Reducers.sum(numbers(), map)
    },
    max: (numbers: DynamicNumbers) => (): number => {
        const array = numbers()
        return array.length === 0 ? null : array.reduce((accumulator, val) => accumulator < val ? val : accumulator)
        // return Reducers.max(numbers(), map)
    },
    min: (numbers: DynamicNumbers) => (): number => {
        const array = numbers()
        return array.length === 0 ? null : array.reduce((accumulator, val) => accumulator > val ? val : accumulator)
        // return Reducers.min(numbers(), map)
    },
}

export default DynamicNumberReducers