import GamePhase from "./GamePhase";

abstract class ContainerPhase extends GamePhase {
    queuedPhases: GamePhase[]

    constructor() {
        super()
        this.queuedPhases = []
    }
}

export default ContainerPhase