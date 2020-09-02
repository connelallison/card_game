import DynamicNumber from "./DynamicNumber"
import DynamicString from "./DynamicString"
import DynamicBoolean from "./DynamicBoolean"
import DynamicTargets from "./DynamicTargets"
import DynamicEvents from "./DynamicEvents"
import DynamicNumbers from "./DynamicNumbers"

type DynamicValue = DynamicNumber | DynamicNumbers| DynamicString | DynamicBoolean | DynamicTargets | DynamicEvents

export default DynamicValue