const DynamicNumberReducers = {
    count: (numbers: number[]) => numbers.reduce(accumulator => accumulator + 1, 0),
    sum: (numbers: number[]) => numbers.reduce((accumulator, val) => accumulator + val, 0),
    max: (numbers: number[]) => numbers.length === 0 ? null : numbers.reduce((accumulator, val) => accumulator < val ? val : accumulator),
    min: (numbers: number[]) => numbers.length === 0 ? null : numbers.reduce((accumulator, val) => accumulator > val ? val : accumulator),
    average: (numbers: number[]) => numbers.length === 0 ? null : DynamicNumberReducers.sum(numbers) / numbers.length,
}

export default DynamicNumberReducers