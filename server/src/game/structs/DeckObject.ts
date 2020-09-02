import CardIDString from "../stringTypes/CardIDString";

interface DeckObject {
    leader: CardIDString
    passive: CardIDString
    cards: CardIDString[]
}

export default DeckObject