import EffectOperation from '../functionTypes/EffectOperation'
import DynamicBoolean from '../functionTypes/DynamicBoolean'
import DynamicNumber from '../functionTypes/DynamicNumber'

const EffectOperations: { [index: string]: EffectOperation } = {
    guard: (data, value: DynamicBoolean) => { data.flags.guard = value() },
    pillage: (data, value: DynamicBoolean) => { data.flags.pillage = value() },
    incrementAttack: (data, value: DynamicNumber) => { data.attack += value() },
    incrementHealth: (data, value: DynamicNumber) => { data.health += value() },
}

export default EffectOperations