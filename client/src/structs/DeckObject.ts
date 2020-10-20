export interface DeckObject {
    id: string
    name: string
    class: 'All' | 'Arms' | 'Art' | 'Economy' | 'Empire' | 'Faith' | 'Infamy' | 'Learning' | 'The People'
    leader: string
    passive: string
    cards: string[]
}

export interface Decks {
    [index: string]: DeckObject
}