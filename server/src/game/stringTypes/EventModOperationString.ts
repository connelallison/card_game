// type EventModOperationString = 'incrementNumberParam'

import EventModOperations from "../dictionaries/EventModOperations"

type EventModOperationString = keyof typeof EventModOperations

export default EventModOperationString