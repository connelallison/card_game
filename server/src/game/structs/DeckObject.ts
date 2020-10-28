interface DeckObject {
    id: string
    name: string
    class: PlayerClassString
    leader: StarterLeaderIDString
    passive: EthosPassiveIDString
    cards: CardIDString[]
    description: string
    tips: string
}

export default DeckObject

import { CardIDString, EthosPassiveIDString, StarterLeaderIDString } from "../stringTypes/DictionaryKeyString";
import PlayerClassString from "../stringTypes/PlayerClassString";
