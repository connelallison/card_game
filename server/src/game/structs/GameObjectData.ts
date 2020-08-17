import FlagsObject from "./FlagsObject";

interface GameObjectData {
    attack?: number
    health?: number
    cost?: number
    flags: FlagsObject
}

export default GameObjectData