import TriggerAction from "./TriggerAction";

interface TriggerActionFactory {
    (...args): TriggerAction
}

export default TriggerActionFactory