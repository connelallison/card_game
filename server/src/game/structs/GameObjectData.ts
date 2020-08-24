import FlagsObject from "./FlagsObject";

interface GameObjectData {
    attack?: number
    health?: number
    maxHealth?: number
    cost?: number
    flags: FlagsObject
}

export default GameObjectData