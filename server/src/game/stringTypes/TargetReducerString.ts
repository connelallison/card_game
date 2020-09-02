import DynamicTargetReducers from "../dictionaries/DynamicTargetReducer"

// type TargetReducerString = 'max' | 'min' | 'first' | 'last'

type TargetReducerString = keyof typeof DynamicTargetReducers

export default TargetReducerString