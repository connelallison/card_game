import GameObject from "../gameObjects/GameObject"

const DynamicNumberReducers = {
    count: (numbers: number[]) => GameObject.truncate(numbers.reduce(accumulator => accumulator + 1, 0)),
    sum: (numbers: number[]) => GameObject.truncate(numbers.reduce((accumulator, val) => accumulator + val, 0)),
    max: (numbers: number[]) => numbers.length === 0 ? null : GameObject.truncate(numbers.reduce((accumulator, val) => accumulator < val ? val : accumulator)),
    min: (numbers: number[]) => numbers.length === 0 ? null : GameObject.truncate(numbers.reduce((accumulator, val) => accumulator > val ? val : accumulator)),
    average: (numbers: number[]) => numbers.length === 0 ? null : GameObject.truncate(DynamicNumberReducers.sum(numbers) / numbers.length),
}

export default DynamicNumberReducers