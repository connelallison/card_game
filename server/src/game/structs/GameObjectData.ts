interface GameObjectData {
    attack?: number
    health?: number
    maxHealth?: number
    cost?: number
    flags: FlagsObject
}

export default GameObjectData

import FlagsObject from "./FlagsObject";