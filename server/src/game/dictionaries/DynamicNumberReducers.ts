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
    count: (numbers: number[]) => numbers.reduce(accumulator => accumulator + 1, 0),
    sum: (numbers: number[]) => numbers.reduce((accumulator, val) => accumulator + val, 0),
    max: (numbers: number[]) => numbers.length === 0 ? null : numbers.reduce((accumulator, val) => accumulator < val ? val : accumulator),
    min: (numbers: number[]) => numbers.length === 0 ? null : numbers.reduce((accumulator, val) => accumulator > val ? val : accumulator),
}

export default DynamicNumberReducers