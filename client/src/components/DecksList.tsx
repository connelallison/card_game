import React, { Component } from 'react'
import { Decks } from '../structs/DeckObject'

interface DecksListProps {
    decks: Decks,
    deckID: string,
    updateDeck: (deckID: string) => void,
}

class DecksList extends Component {
    props!: DecksListProps

    constructor(props: DecksListProps) {
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
        const deckRows = Object.values(this.props.decks).map(deck => <tr key={deck.id} className='deckListRow' onClick={() => this.props.updateDeck(deck.id)} ><td className={`notTargetable ${this.cardClass(deck.class)}`}>{deck.name} - <em>{deck.class}</em></td></tr>)

        return <div className='decksList'>
            <table className='decksListTable'>
                <thead><tr><td>Decks</td></tr></thead>
                <tbody>
                    {deckRows}
                </tbody>
            </table>
        </div>
    }
}

export default DecksList