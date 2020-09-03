const DynamicTargetReducers = {
    max: (targets: GameObject[], map: TargetToNumberMap) => (targets.length === 0 ? targets : [targets.reduce((accumulator, val) => map(accumulator) < map(val) ? val : accumulator)]),
    min: (targets: GameObject[], map: TargetToNumberMap) => (targets.length === 0 ? targets : [targets.reduce((accumulator, val) => map(accumulator) > map(val) ? val : accumulator)]),
    first: (targets: GameObject[]) => (targets.length === 0 ? targets : [targets[0]]),
    last: (targets: GameObject[]) => (targets.length === 0 ? targets : [targets[targets.length - 1]]),
}

export default DynamicTargetReducers

import GameObject from "../gameObjects/GameObject"
import TargetToNumberMap from "../functionTypes/TargetToNumberMap"