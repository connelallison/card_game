import PlayRequirementFactory from "../functionTypes/PlayRequirementFactory"
import Card from "../gameObjects/Card"

const PlayRequirements: {[index: string]: PlayRequirementFactory} = {
    minEnemyMinions: (min: number) => (card: Card) => (card.controller().opponent.board.length >= min),
}

export default PlayRequirements