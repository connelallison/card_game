// type NumberOperatorString = 'add' | 'subtract' | 'multiply' | 'divide'

import DynamicNumberOperators from "../dictionaries/DynamicNumberOperators"

type NumberOperatorString = keyof typeof DynamicNumberOperators

export default NumberOperatorString