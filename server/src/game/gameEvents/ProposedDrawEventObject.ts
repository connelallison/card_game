import GamePlayer from "../gameObjects/GamePlayer";
import TargetRequirement from "../functionTypes/TargetRequirement";

interface ProposedDrawEventObject {
    player: GamePlayer,
    number?: number,
    criteria?: TargetRequirement[]
}

export default ProposedDrawEventObject