export interface DeckObject {
    id: string
    name: string
    class: PlayerClassString
    leader: string
    passive: string
    cards: string[]
    description: string
    tips: string
}

export interface Decks {
    [index: string]: DeckObject
}

export interface CardObject {
    name: string
    id: string
    cost: number
    attack?: number
    health?: number
    charges?: number
    type: string
    subtype: string
    classes: PlayerClassString[]
    text: string
    categories?: string[]
    relatedCard: CardObject
}

export interface Cards {
    [index: string]: CardObject
}

// type PlayerClassString = 'All' | 'Arms' | 'Art' | 'Economy' | 'Empire' | 'Faith' | 'Infamy' | 'Learning' | 'The People'
type PlayerClassString = 'All' | 'Economy' | 'Infamy' | 'Learning' | 'The People'