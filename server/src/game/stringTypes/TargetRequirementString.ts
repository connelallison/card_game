// type TargetRequirementString = 'minVal' | 'maxVal' | 'isFriendly' | 'isEnemy' | 'notSelf' | 'isSelf' | 'isSpecificCardClass' | 'isNotSpecificCardClass' | 'isType' | 'isNotType' | 'isDynamicTarget' | 'isNotDynamicTarget' | 'inZone' | 'notInZone'

import TargetRequirements from "../dictionaries/TargetRequirements"

type TargetRequirementString = keyof typeof TargetRequirements

export default TargetRequirementString