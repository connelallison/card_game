import EffectOperation from '../functionTypes/EffectOperation'
import DynamicBoolean from '../functionTypes/DynamicBoolean'
import DynamicNumber from '../functionTypes/DynamicNumber'

const EffectOperations = {
    guard: (data, value: boolean) => { data.flags.guard = value },
    pillage: (data, value: boolean) => { data.flags.pillage = value },
    incrementAttack: (data, value: number) => { data.attack += value >= 0 ? value : 0 },
    incrementHealth: (data, value: number) => { data.health += value >= 0 ? value : 0 },
}

export default EffectOperations