import PlayRequirementFactory from "../functionTypes/PlayRequirementFactory"
import Card from "../gameObjects/Card"
import PersistentCardTypeString from "../stringTypes/PersistentCardTypeString"

const PlayRequirements: {[index: string]: PlayRequirementFactory} = {
    minFriendlyUnits: (min: number) => (card: Card) => (card.controller().board.length >= min),
    minEnemyUnits: (min: number) => (card: Card) => (card.controller().opponent.board.length >= min),
    minAllUnits: (min: number) => (card: Card) => (card.controller().board.length + card.controller().opponent.board.length >= min),
    canSummonType: (cardType: PersistentCardTypeString) => (card: Card) => (card.controller().canSummonType(cardType)),
}

export default PlayRequirements