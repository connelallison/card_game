import Action from "./Action";

interface ActionFactory {
    (...args): Action
}

export default ActionFactory