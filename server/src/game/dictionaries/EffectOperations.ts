import EffectOperation from '../functionTypes/EffectOperation'
import DynamicBoolean from '../functionTypes/DynamicBoolean'
import DynamicNumber from '../functionTypes/DynamicNumber'

const EffectOperations = {
    guard: (data, value: DynamicBoolean) => { data.flags.guard = value() },
    pillage: (data, value: DynamicBoolean) => { data.flags.pillage = value() },
    incrementAttack: (data, value: DynamicNumber) => { data.attack += value() >= 0 ? value() : 0 },
    incrementHealth: (data, value: DynamicNumber) => { data.health += value() >= 0 ? value() : 0 },
}

export default EffectOperations