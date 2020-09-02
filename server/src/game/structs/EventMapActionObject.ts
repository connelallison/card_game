import GameEvent from "../gameEvents/GameEvent";
import DynamicNumberObject from "./DynamicNumberObject";
import DynamicTargetObject from "./DynamicTargetObject";
import DynamicTargetsObject from "./DynamicTargetsObject";
import TargetsDomainString from "../stringTypes/TargetsDomainString";
import ActionOperationString from "../stringTypes/ActionOperationString";
import ActionObject from "./ActionObject";
import Card from "../gameObjects/Card";
import StoredValues from "./StoredValues";
import ValuesObject from "./ValuesObject";

interface EventMapActionObject {
    actionType: 'eventMapAction'
    operation: ActionOperationString,
    values: ValuesObject,
    stored?: StoredValues,
    eventMap: (event: GameEvent) => Card | Card[],
}

export default EventMapActionObject