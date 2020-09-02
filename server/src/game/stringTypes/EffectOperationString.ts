// type EffectOperationString = 'guard' | 'pillage' | 'incrementAttack' | 'incrementHealth'

import EffectOperations from "../dictionaries/EffectOperations"

type EffectOperationString = keyof typeof EffectOperations

export default EffectOperationString