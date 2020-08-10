import GamePlayer from "../gameObjects/GamePlayer";
import TargetRequirement from "../functionTypes/TargetRequirement";

interface DrawSequenceObject {
    player: GamePlayer,
    number?: number,
    criteria?: TargetRequirement[]
}

export default DrawSequenceObject