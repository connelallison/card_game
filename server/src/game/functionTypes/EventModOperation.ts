import EventMod from "./EventMod";

interface EventModOperation {
    (...args): EventMod
}

export default EventModOperation