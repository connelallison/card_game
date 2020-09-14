interface DeckObject {
    leader: LeaderIDString
    passive: EthosPassiveIDString
    cards: CardIDString[]
}

export default DeckObject

import { CardIDString, LeaderIDString, EthosPassiveIDString } from "../stringTypes/DictionaryKeyString";