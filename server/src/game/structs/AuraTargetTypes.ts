import ObjectTypeString from "../stringTypes/ObjectTypeString"
import ZoneString from "../stringTypes/ZoneString"

type AuraTargetTypes = {
    [targetType in ObjectTypeString]?: ZoneString[]
}

export default AuraTargetTypes