import React, { Component } from 'react'
import DeckCardList from '../components/DeckCardList'
import DecksList from '../components/DecksList'
import DeckView from '../components/DeckView'
import DisplayName from '../components/DisplayName'
import { Cards, Decks } from '../structs/DeckObject'

interface DeckViewProps {
    offscreen?: boolean
    decks: Decks
    cards: Cards
    deckID: string
    displayName: string
    updateName: (name: string) => void
    updateDeck: (deckID: string) => void
}

class DeckViewContainer extends Component {
    props!: DeckViewProps

    constructor(props: DeckViewProps) {
        super(props)
    }

    render() {
        // const cards = this.props.decks[this.props.deckID].cards.map(cardID => this.props.cards[cardID])
        const deckViewContainer = (!this.props.decks || !this.props.cards)
            ? null
            : <div id='deckViewContainer' className={this.props.offscreen ? 'offscreen' : ''}>
                <DecksList decks={this.props.decks} deckID={this.props.deckID} updateDeck={this.props.updateDeck} />
                <DeckView cards={this.props.cards} deck={this.props.decks[this.props.deckID]} />
                <DeckCardList cards={this.props.cards} deck={this.props.decks[this.props.deckID]} />
            </div>
        return (
            <>
                {/* <div className='topBar'>
                    <DisplayName displayName={this.props.displayName} handleSubmit={this.props.updateName} />
                </div> */}
                {deckViewContainer}
            </>
        )
    }
}

export default DeckViewContainer