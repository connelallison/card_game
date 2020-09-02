import DynamicTargetFromEvent from "./DynamicTargetFromEvent";
import DynamicTargetFromTargets from "./DynamicTargetFromTargets";
import DynamicTargetFromTargetDomain from "./DynamicTargetFromTargetDomain";

type DynamicTargetObject = DynamicTargetFromEvent | DynamicTargetFromTargets | DynamicTargetFromTargetDomain

export default DynamicTargetObject