import React, { Component } from 'react'
import { Cards, DeckObject } from '../structs/DeckObject'
import { dummyAnimations, dummySelections } from '../structs/Dummies'
import CardName from './CardName'
import NameList from './NameList'

interface DeckCardListProps {
    deck: DeckObject
    cards: Cards
}

class DeckCardList extends Component {
    props!: DeckCardListProps

    render() {
        return <div className='deckCardList' >
            <p className='deckCardListHeading' >Leader</p>
            <CardName selections={dummySelections} animations={dummyAnimations} object={this.props.cards[this.props.deck.leader]} />
            <p className='deckCardListHeading' >Ethos</p>
            <CardName selections={dummySelections} animations={dummyAnimations} object={this.props.cards[this.props.deck.passive]} />
            <p className='deckCardListHeading' >Cards</p>
            <NameList deckView contents={this.props.deck.cards.map(cardID => this.props.cards[cardID])} animations={dummyAnimations} selections={dummySelections} />
        </div>
    }
}

export default DeckCardList