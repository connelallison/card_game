import ObjectTypeString from "./ObjectTypeString"
import ZoneString from "./ZoneString"

type AuraTargetTypes = {
    [targetType in ObjectTypeString]?: ZoneString[]
}

export default AuraTargetTypes