import DynamicEventReducers from "../dictionaries/DynamicEventReducers"

type EventReducerString = keyof typeof DynamicEventReducers

export default EventReducerString