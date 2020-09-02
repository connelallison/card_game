// type NumberReducerString = 'count' | 'sum' | 'max' | 'min'

import DynamicNumberReducers from "../dictionaries/DynamicNumberReducers"

type NumberReducerString = keyof typeof DynamicNumberReducers

export default NumberReducerString