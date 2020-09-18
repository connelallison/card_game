const NumberToBooleanMaps = {
    equals: (number: number, comparison: number) => number === comparison,
    greaterThan: (number: number, comparison: number) => number > comparison,
    equalGreaterThan: (number: number, comparison: number) => number >= comparison,
    lessThan: (number: number, comparison: number) => number < comparison,
    equalLessThan: (number: number, comparison: number) => number <= comparison,  
}

export default NumberToBooleanMaps