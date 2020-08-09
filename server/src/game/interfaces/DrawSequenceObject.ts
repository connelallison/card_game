import GamePlayer from "../gameObjects/GamePlayer";

interface DrawSequenceObject {
    player: GamePlayer,
    number?: number,
    criteria?: (() => boolean)[]
}

export default DrawSequenceObject