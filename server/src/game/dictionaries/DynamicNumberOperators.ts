import DynamicNumber from "../functionTypes/DynamicNumber"
import DynamicNumberOperatorFactory from "../functionTypes/DynamicNumberOperatorFactory"

const DynamicNumberOperators: {[index: string]: DynamicNumberOperatorFactory } = {
    add: (value: number | DynamicNumber) => value === null ? (acc: number) => acc : typeof value === 'number' ? (acc: number) => (acc + value) : (acc: number) => (acc + value()),
    subtract: (value: number | DynamicNumber) => value === null ? (acc: number) => acc : typeof value === 'number' ? (acc: number) => (acc - value) : (acc: number) => (acc - value()),
    multiply: (value: number | DynamicNumber) => value === null ? (acc: number) => acc : typeof value === 'number' ? (acc: number) => (acc * value) : (acc: number) => (acc * value()),
    divide: (value: number | DynamicNumber) => value === null ? (acc: number) => acc : typeof value === 'number' ? (acc: number) => (acc / value) : (acc: number) => (acc / value()),
}

export default DynamicNumberOperators