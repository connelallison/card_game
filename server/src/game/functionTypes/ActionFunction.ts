import ActionEvent from "../gameEvents/ActionEvent";

interface ActionFunction {
    (event: ActionEvent): void
}

export default ActionFunction