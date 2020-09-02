import AutoActionObject from "./AutoActionObject"
import EventModActionObject from "./EventModActionObject"
import EventMapActionObject from "./EventMapActionObject"

type TriggerActionObject = EventModActionObject | AutoActionObject | EventMapActionObject

export default TriggerActionObject