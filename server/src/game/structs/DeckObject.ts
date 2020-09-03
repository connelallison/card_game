interface DeckObject {
    leader: CardIDString
    passive: CardIDString
    cards: CardIDString[]
}

export default DeckObject

import { CardIDString } from "../stringTypes/DictionaryKeyString";