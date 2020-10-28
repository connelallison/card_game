import React, { Component } from 'react'
import { Cards, DeckObject, Decks } from '../structs/DeckObject'
import { dummyAnimations, dummySelections } from '../structs/Dummies'
import { BigCard } from './HoverCard'

interface DeckViewProps {
    deck: DeckObject
    cards: Cards
}

class DeckView extends Component {
    props!: DeckViewProps

    constructor(props: DeckViewProps) {
        super(props)
    }

    cardClass(cardClass: string): string {
        switch (cardClass) {
            case 'All':
                return 'allClasses'
            case 'Arms':
                return 'arms'
            case 'Art':
                return 'art'
            case 'Economy':
                return 'economy'
            case 'Empire':
                return 'empire'
            case 'Faith':
                return 'faith'
            case 'Infamy':
                return 'infamy'
            case 'Learning':
                return 'learning'
            case 'The People':
                return 'thePeople'
            default:
                return ''
        }
    }

    render() {
        const cards = [this.props.cards[this.props.deck.passive], this.props.cards[this.props.deck.leader], this.props.cards[this.props.deck.leader].relatedCard]
        const bigCards = cards.map((card, index) =>
            <BigCard key={`${this.props.deck.id}:${card.id}:${index}`} object={card} animations={dummyAnimations} selections={dummySelections} />
        )

        return <div className='deckView'>
            <h2 className={this.cardClass(this.props.deck.class)} >{this.props.deck.name} - <em>{this.props.deck.class}</em></h2>
            <div className='big cardList'>
                {bigCards}
            </div>
            <div className={`deckViewText ${this.cardClass(this.props.deck.class)}`} >
                <h3>Description</h3>
                <p className='deck-text' >{this.props.deck.description}</p>
                <h3>Tips</h3>
                <p className='deck-text' >{this.props.deck.tips}</p>
            </div>
        </div>
    }
}

export default DeckView