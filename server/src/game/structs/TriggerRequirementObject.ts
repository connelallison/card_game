import TargetRequirementString from "../stringTypes/TargetRequirementString";
import DynamicNumberObject from "./DynamicNumberObject";
import DynamicTargetObject from "./DynamicTargetObject";
import GameEvent from "../gameEvents/GameEvent";
import PlayRequirementString from "../stringTypes/PlayRequirementString";

interface TriggerRequirementObject {
    targetRequirement?: TargetRequirementString,
    playRequirement?: PlayRequirementString,
    values?: {[index: string]: number | boolean | string | DynamicNumberObject | DynamicTargetObject},
    eventMap?: (event: GameEvent) => any,
}

export default TriggerRequirementObject