import ActionFunction from "./ActionFunction";

interface ActionOperation {
    (...args): ActionFunction
}

export default ActionOperation