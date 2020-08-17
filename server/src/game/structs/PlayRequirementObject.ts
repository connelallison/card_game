import PlayRequirementString from "../stringTypes/PlayRequirementString";
import DynamicNumberObject from "./DynamicNumberObject";
import DynamicTargetObject from "./DynamicTargetObject";

interface PlayRequirementObject {
    playRequirement: PlayRequirementString,
    values?: {[index: string]: number | boolean | string | DynamicNumberObject | DynamicTargetObject}
}

export default PlayRequirementObject