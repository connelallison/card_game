interface DeckObject {
    id: string
    name: string
    leader: StarterLeaderIDString
    passive: EthosPassiveIDString
    cards: CardIDString[]
}

export default DeckObject

import { CardIDString, EthosPassiveIDString, StarterLeaderIDString } from "../stringTypes/DictionaryKeyString";