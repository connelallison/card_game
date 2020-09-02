import DynamicStringObject from "./DynamicStringObject";
import DynamicNumberObject from "./DynamicNumberObject";
import DynamicEventsObject from "./DynamicEventsObject";
import DynamicNumbersObject from "./DynamicNumbersObject";
import DynamicTargetObject from "./DynamicTargetObject";
import DynamicTargetsObject from "./DynamicTargetsObject";
import DynamicEventObject from "./DynamicEventObject";

type DynamicValueObject = DynamicStringObject | DynamicNumberObject | DynamicNumbersObject | DynamicTargetObject | DynamicTargetsObject | DynamicEventObject | DynamicEventsObject

export default DynamicValueObject